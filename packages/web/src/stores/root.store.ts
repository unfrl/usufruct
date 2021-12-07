import { Usufruct } from '@unfrl/usufruct-sdk';
import { AuthStore } from './auth.store';
import { InventoryStore } from './inventory.store';
import { ToastStore } from './toast.store';

export class RootStore {
  public readonly client: Usufruct;

  // stores
  public readonly auth: AuthStore;
  public readonly inventory: InventoryStore;
  public readonly toasts: ToastStore;

  public constructor() {
    this.client = new Usufruct(
      {
        signRequest: async (resource) => {
          resource.headers.set(
            'Authorization',
            `Bearer ${AuthStore.getAccessToken()}`,
          );
          return resource;
        },
      },
      // TODO: move to config and pull from env variable
      'http://localhost:1337',
    );
    this.auth = new AuthStore(this);
    this.inventory = new InventoryStore(this);
    this.toasts = new ToastStore();
  }
}
