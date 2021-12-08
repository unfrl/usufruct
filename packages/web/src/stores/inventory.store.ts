import { CreateItemDto, Item } from '@unfrl/usufruct-sdk';
import { makeAutoObservable } from 'mobx';
import { RootStore } from './root.store';

export class InventoryStore {
  public query: string = '';

  public items: Item[] = [];

  public get filteredItems() {
    const query = this.query.trim().toLowerCase();
    return this.items.filter((item) => item.name.search(query) > -1);
  }

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

  public createItem = async (itemDto: CreateItemDto) => {
    try {
      const item = await this._rootStore.client.createItem(itemDto);
      this.addItem(item);
    } catch (error) {
      console.error('failed to create item', error);
      throw error;
    }
  };

  public setQuery = (query: string) => {
    this.query = query;
  };

  private setItems = (items: Item[]) => {
    this.items = items;
  };

  private addItem = (item: Item) => {
    this.items.push(item);
  };
}
