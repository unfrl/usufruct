import { Usufruct } from '@unfrl/usufruct-sdk';
import { ACCESS_TOKEN_KEY, AuthStore } from './auth.store';
import { ToastStore } from './toast.store';

export class RootStore {
  public readonly client: Usufruct;

  // stores
  public readonly auth: AuthStore;
  public readonly toasts: ToastStore;

  public constructor() {
    // TODO: maybe refactor client instantiation out of the root store and into a util or something
    this.client = new Usufruct(
      {
        signRequest: async (resource) => {
          // note: don't rely on authStore for token here, would result in circular dep and can't guarantee each will be initialized when used
          const token = localStorage.getItem(ACCESS_TOKEN_KEY) ?? '';
          resource.headers.set('Authorization', `Bearer ${token}`);
          return resource;
        },
      },
      // TODO: move to config and pull from env variable
      'http://localhost:1337',
    );
    this.auth = new AuthStore(this);
    this.toasts = new ToastStore();
  }
}
