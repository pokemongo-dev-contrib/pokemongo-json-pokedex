import { ComponentRegister, ComponentRegistry, ComponentType } from '@core/pipeline';
import { ItemTemplate, RootObject } from '../game_master/index';

import { Component } from '@core/pipeline';
import { IComponent } from './component';

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

  /**
   * Runs the components of its Pipeline
   */
  public Run(): Object[] {
    this.resolveDependencyResolution();
    let output = [];
    this.sortedComponents
      .forEach(component => {
        if (component.settings.type === ComponentType.SIMPLE_MAP) {
          output = this.parsedInput.map((input, index) => component.component.Process(output[index] || {}, input));
        } else if (component.settings.type === ComponentType.ADVANCED_MAP) {
          output = component.component.Process(output, this.parsedInput);
        }
      });
    return output;
  }
}