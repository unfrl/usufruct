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
    try {
      this.setLoading(true);
      this.setItems(
        await client.items.getItems(this._root.library.activeLibraryId),
      );
    } catch (error) {
      console.error('failed to get items', error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  };

  public createItem = async (itemDto: UpsertItemDto): Promise<Item> => {
    try {
      const item = await client.items.createItem(
        this._root.library.activeLibraryId,
        itemDto,
      );

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
