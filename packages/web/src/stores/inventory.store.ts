import { Item } from '@unfrl/usufruct-sdk';
import { RootStore } from './root.store';

export class InventoryStore {
  public items: Item[] = [];

  public constructor(private readonly _rootStore: RootStore) {}

  public loadAllItems = async () => {
    try {
      const items = await this._rootStore.client.getItems();
      console.log('wtf items yo', items);
      // this.setItems(items)
    } catch (error) {
      console.error('failed to get items', error);
      throw error;
    }
  };

  private setItems = (items: Item[]) => {
    this.items = items;
  };
}
