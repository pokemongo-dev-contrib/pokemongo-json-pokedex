import { ComponentRegister, ComponentRegistry, ComponentType } from '@core/pipeline';
import { ItemTemplate, RootObject } from '../../income';
import { mapSeries, forEachSeries } from 'p-iteration';

/**
 * Represents a Pipeline which runs multiple components
 */
export abstract class Pipeline {
  protected name: string;
  protected input: RootObject;
  protected _components: ComponentRegister[];
  protected parsedInput: ItemTemplate[];
  private sortedComponents: ComponentRegister[];
  private visitedComponents: Object;

  /**
   * Creates a new pipeline and parses the input by calling
   * `isItemTemplate`
   * @param input The GAME_MASTER data
   * @param name The name of the pipeline
   */
  constructor(input: RootObject, name: string) {
    this.input = input;
    this.name = name;
    this.parsedInput = this.Parse();
  }

  public get Components() {
    if (!this._components) {
      this._components = ComponentRegistry.Instance.Components.filter(component => component.settings.pipeline === this.name);
    }
    return this._components;
  }
  abstract isItemTemplate(item: ItemTemplate): boolean;

  Parse(): ItemTemplate[] {
    return this.input.itemTemplates
      .filter(p => this.isItemTemplate(p));
  }

  /**
   * Checks the dependencies of the given component-register
   * @param component The component-register to check the dependencies
   * @param ancestors (optional) Its parent ids
   */
  private visitComponent(component: ComponentRegister, ancestors?: string[]) {
    if (ancestors === undefined) {
      ancestors = [];
    }
    ancestors.push(component.id);
    this.visitedComponents[component.id] = true;

    component.dependencies.forEach(dependency => {
      // @ts-ignore
      const dependencyId = dependency.constructor.name;
      if (ancestors.indexOf(dependencyId) >= 0)  // if already in ancestors, a closed chain exists.
        throw new Error(`Circular dependency "${dependencyId}'" is required by "${component.id}": ${ancestors.join(' -> ')}`);

      // if already exists, do nothing
      if (this.visitedComponents[component.id]) return;
      this.visitComponent(dependency, ancestors.slice(0)); // recursive call
    });

    this.sortedComponents.push(component);
  }

  /**
   * Sorts the components so it is executed with correct dependency relation.
   * Will be stored inside `this.sortedComponents`
   */
  private resolveDependencyResolution() {
    this.sortedComponents = [];
    this.visitedComponents = {};

    this.Components.forEach(component => this.visitComponent(component));
  }

  private async process(component: ComponentRegister, output: any, input: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let callback;

      try {
        // Synchronous
        callback = component.component.Process(output, input);
      } catch (error) {
        reject(error);
      }

      if (callback && callback.then) {
        // Is async
        callback.then(resolve).catch(reject)
      } else {
        resolve(callback);
      }

    });
  }

  private shouldComponentBeProcessed(component: ComponentRegister, input: ItemTemplate) {
    // No templateId settings was set (= allow every item template)
    return !component.settings.templateId ||
      // or is actually correct template id
      input.templateId === component.settings.templateId;
  }

  private async processSimpleMapComponent(component: ComponentRegister, output: any[]) {
    return await mapSeries(this.parsedInput, async (input, index) => {
      const processedItem = output[index] || {};
      if (this.shouldComponentBeProcessed(component, input)) {
        return await this.process(component, processedItem, input);
      } else {
        // Skip component processing
        return processedItem;
      }
    });
  }

  /**
   * Runs the components of its Pipeline
   */
  public async Run(): Promise<Object[]> {
    this.resolveDependencyResolution();
    let output = [];
    await forEachSeries(this.sortedComponents, async component => {
      if (component.settings.type === ComponentType.SIMPLE_MAP) {
        output = await this.processSimpleMapComponent(component, output);
      } else if (component.settings.type === ComponentType.ADVANCED_MAP) {
        output = await this.process(component, output, this.parsedInput);
      }
    });
    return output;
  }
}
