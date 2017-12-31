import { IComponent } from './component';
import { RootObject, ItemTemplate } from '../game_master/index';
import { ComponentRegistry, ComponentRegister } from '@core/pipeline/registry';

/**
 * Represents a Pipeline which runs multiple components
 */
export abstract class Pipeline {
  protected type: string;
  protected input: RootObject;
  protected components: ComponentRegister[] = [];
  protected parsedInput: ItemTemplate[];

  constructor(input: RootObject, type: string) {
    this.input = input;
    this.type = type;
    this.components = ComponentRegistry.Instance.Components.filter(component => component.settings.type === this.type);
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
    return this.parsedInput.map(input => {
      let model = {} as Object;
      this.components.forEach(component => model = (component.component as IComponent).Process(model, input));
      return model;
    });
  }
}