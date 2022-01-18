import { Item, UpsertItemDto } from '@unfrl/usufruct-sdk';
import { makeAutoObservable } from 'mobx';
import { client } from '../api';
import { RootStore } from './root.store';

export class InventoryStore {
  public loading: boolean = false;

  public query: string = '';

  public items: Item[] = [];

  public get filteredItems() {
    const query = this.query.trim().toLowerCase();
    return this.items.filter((item) => item.name.search(query) > -1);
  }

  public constructor(private readonly _root: RootStore) {
    makeAutoObservable(this);
  }

  public loadAllItems = async () => {
    if (!this._root.library.selectedLibrary) {
      return;
    }

    try {
      this.setLoading(true);
      const { id } = this._root.library.selectedLibrary;
      this.setItems(await client.items.getItems(id));
    } catch (error) {
      console.error('failed to get items', error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  };

  public createItem = async (itemDto: UpsertItemDto): Promise<Item> => {
    if (!this._root.library.selectedLibrary) {
      throw new Error('Unauthorized');
    }

    try {
      const { id } = this._root.library.selectedLibrary;
      const item = await client.items.createItem(id, itemDto);
      this.addItem(item);
      return item;
    } catch (error) {
      console.error('failed to create item', error);
      throw error;
    }
  };

  //#region actions

  public setQuery = (query: string) => {
    this.query = query;
  };

  private setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  private setItems = (items: Item[]) => {
    this.items = items;
  };

  private addItem = (item: Item) => {
    this.items.push(item);
  };

  //#endregion
}
