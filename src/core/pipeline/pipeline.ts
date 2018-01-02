import { IComponent } from './component';
import { RootObject, ItemTemplate } from '../game_master/index';
import { ComponentType, ComponentRegistry, ComponentRegister } from '@core/pipeline';
import { Component } from '@core/pipeline';

/**
 * Represents a Pipeline which runs multiple components
 */
export abstract class Pipeline {
  protected name: string;
  protected input: RootObject;
  protected components: ComponentRegister[] = [];
  protected parsedInput: ItemTemplate[];

  /**
   * Creates a new pipeline and parses the input by calling
   * `isItemTemplate`
   * @param input The GAME_MASTER data
   * @param name The name of the pipeline
   */
  constructor(input: RootObject, name: string) {
    this.input = input;
    this.name = name;
    this.components = ComponentRegistry.Instance.Components.filter(component => component.settings.pipeline === this.name);
    this.parsedInput = this.Parse();
  }
  abstract isItemTemplate(item: ItemTemplate): boolean;

  Parse(): ItemTemplate[] {
    return this.input.itemTemplates
      .filter(p => this.isItemTemplate(p));
  }

  /**
   * Runs the components of its Pipeline
   */
  public Run(): Object[] {
    const simpleMapModels = this.parsedInput.map(input => {
      let model = {} as Object;
      this.components
        .filter(component => component.settings.type === ComponentType.SIMPLE_MAP)
        .forEach(component => model = (component.component as IComponent).Process(model, input));
      return model;
    });
    let models: Object[] = simpleMapModels;
    this.components
      .filter(component => component.settings.type === ComponentType.ADVANCED_MAP)
      .forEach(component => models = (component.component as IComponent).Process(models, this.parsedInput));
    return models;
  }
}