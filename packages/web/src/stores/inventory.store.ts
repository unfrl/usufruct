import { Category, Item, Label, UpsertItemDto } from '@unfrl/usufruct-sdk';
import { makeAutoObservable } from 'mobx';
import { RootStore } from './root.store';

export class InventoryStore {
  public query: string = '';

  public items: Item[] = [];

  public categories: Category[] = [];

  public labels: Label[] = [];

  public get filteredItems() {
    const query = this.query.trim().toLowerCase();
    return this.items.filter((item) => item.name.search(query) > -1);
  }

  public constructor(private readonly _rootStore: RootStore) {
    makeAutoObservable(this);
  }

  // TODO: refactor this - UI that relies on these arrays should just call API directly & store in component state
  public loadAll = async () => {
    await Promise.all([
      this.loadAllItems(),
      this.loadCategories(),
      this.loadLabels(),
    ]);
  };

  public loadAllItems = async () => {
    try {
      const items = await this._rootStore.client.getItems();
      this.setItems(items);
    } catch (error) {
      console.error('failed to get items', error);
      throw error;
    }
  };

  public loadCategories = async () => {
    try {
      console.log('loading categories...');
      const categories = await this._rootStore.client.getCategories();
      this.setCategories(categories);
    } catch (error) {
      console.error('failed to load categories', error);
      throw error;
    }
  };

  public loadLabels = async () => {
    try {
      console.log('loading labels...');
      const labels = await this._rootStore.client.getLabels();
      this.setLabels(labels);
    } catch (error) {
      console.error('failed to load labels', error);
      throw error;
    }
  };

  public createItem = async (itemDto: UpsertItemDto): Promise<Item> => {
    try {
      const item = await this._rootStore.client.createItem(itemDto);
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

  private setItems = (items: Item[]) => {
    this.items = items;
  };

  private addItem = (item: Item) => {
    this.items.push(item);
  };

  private setCategories = (categories: Category[]) => {
    this.categories = categories;
  };

  private setLabels = (labels: Label[]) => {
    this.labels = labels;
  };

  //#endregion
}
