import { Item } from '@unfrl/usufruct-sdk';
import { makeAutoObservable } from 'mobx';
import { RootStore } from './root.store';

export class InventoryStore {
  public items: Item[] = [];

  public constructor(private readonly _rootStore: RootStore) {
    makeAutoObservable(this);
  }

  public loadAllItems = async () => {
    try {
      const items = await this._rootStore.client.getItems();
      // TODO: should _not_ need to call Object.values -- for some reason it's not respecting the & Item[] type
      this.setItems(Object.values(items));
    } catch (error) {
      console.error('failed to get items', error);
      throw error;
    }
  };

  private setItems = (items: Item[]) => {
    this.items = items;
  };
}
