import { AuthStore } from './auth.store';
import { InventoryStore } from './inventory.store';
import { ToastStore } from './toast.store';

export class RootStore {
  public readonly auth: AuthStore;
  public readonly inventory: InventoryStore;
  public readonly toasts: ToastStore;

  public constructor() {
    this.auth = new AuthStore(this);
    this.inventory = new InventoryStore(this);
    this.toasts = new ToastStore();
  }
}
