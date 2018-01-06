import { ComponentSettings, IComponent } from './component';

/**
 * Stores a component and its settings
 */
export interface ComponentRegister {
  settings: ComponentSettings;
  component: IComponent;
  id: string;
  dependencies?: ComponentRegister[];
}


/**
 * Factory for registering any component
 */
export class ComponentRegistry {
  private components: ComponentRegister[] = [];
  private static instance: ComponentRegistry;
  private areDependenciesAlreadyMapped: boolean = false;

  /**
   * Maps dependencies of a component setting with
   * a component register of this ComponentRegistry.
   */
  private MapDependencies() {
    if (this.areDependenciesAlreadyMapped) return;
    this.areDependenciesAlreadyMapped = true;
    (this.components || []).forEach(component =>
      component.dependencies = (component.settings.dependencies || []).map(dependency =>
        this.GetComponentById(
          // @ts-ignore
          dependency.constructor.name)));
  }
  /**
   * Registers the given component with the given settings
   * @param component The component class to register
   * @param settings The settings the component has
   */
  public Register(component: IComponent, settings: ComponentSettings) {
    this.components.push({
      settings, component,
      // @ts-ignore
      id: component.constructor.name
    });
  }

  public GetComponentById(componentId) {
    return this.components.find(component => component.id === componentId)
  }
  /**
   * Returns all registered components
   */
  public get Components() {
    this.MapDependencies();
    return this.components;
  }

  /**
   * Returns the instance of this registry
   */
  public static get Instance() {
    return this.instance || (this.instance = new this());
  }
}