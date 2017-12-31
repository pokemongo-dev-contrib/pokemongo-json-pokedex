import { ComponentRegistry } from './registry';
import { compile } from 'handlebars';

/**
 * Represents a component
 */
export interface IComponent {
  /**
   * Alters any data from the input and saves it in the output.
   */
  Process(output: any, input: any): any;
}


/**
 * Settings a component can have
 */
export interface ComponentSettings {
  /**
   * The type of the component. Decides in which
   * pipeline this component belongs to
   */
  type: string;
}

/**
 * Registers a component
 * @param settings The settings of the component
 */
export function Component(settings: ComponentSettings) {
  return function (target: any) {
    const component = Object.create(target.prototype);
    ComponentRegistry.Instance.Register(component, settings);
  }
}