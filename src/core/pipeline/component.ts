import { ComponentRegistry } from './registry';

/**
 * Represents a component
 */
export interface IComponent {
  /**
   * Alters any data from the input and saves it in the output.
   * @param {any} output The object which will be the output. Must be returned
   * @param {any} input The raw data
   */
  Process(output: any, input: any): any;
}

/**
 * The type of the component
 */
export enum ComponentType {
  /**
   * Simple maps are used for components which only require
   * a single item.
   */
  SIMPLE_MAP,
  /**
   * Advanced maps are used for components which requires
   * more than one item.
   */
  ADVANCED_MAP
}

/**
 * Settings a component can have
 */
export interface ComponentSettings {
  /**
   * Which pipeline this component belongs to
   */
  pipeline: string;
  type?: ComponentType;
  /**
   * List of components which need to be executed in advance
   */
  dependencies?: IComponent[]
}

/**
 * Registers a component
 * @param settings The settings of the component
 */
export function Component(settings: ComponentSettings) {
  // Default values
  settings.type = settings.type || ComponentType.SIMPLE_MAP;
  return function (target: any) {
    const component = Object.create(target.prototype);
    ComponentRegistry.Instance.Register(component, settings);
  }
}