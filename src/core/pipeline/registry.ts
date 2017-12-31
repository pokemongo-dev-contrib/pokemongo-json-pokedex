import { IComponent, ComponentSettings } from './component';

/**
 * Stores a component and its settings
 */
export interface ComponentRegister {
  settings: ComponentSettings;
  component: IComponent;
}

/**
 * Factory for registering any component
 */
export class ComponentRegistry {
  private components: ComponentRegister[] = [];
  private static instance: ComponentRegistry;
  /**
   * Registers the given component with the given settings
   * @param component The component class to register
   * @param settings The settings the component has
   */
  public Register(component: IComponent, settings: ComponentSettings) {
    this.components.push({ settings, component });
  }

  /**
   * Returns all registered components
   */
  public get Components() {
    return this.components;
  }

  /**
   * Returns the instance of this registry
   */
  public static get Instance() {
    return this.instance || (this.instance = new this());
  }
}