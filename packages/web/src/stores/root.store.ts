import { Usufruct } from '@unfrl/usufruct-sdk';
import { AuthStore } from './auth.store';

export class RootStore {
  public readonly client: Usufruct;

  public readonly authStore: AuthStore;

  public constructor() {
    this.client = new Usufruct(
      {
        signRequest: async (resource) => {
          const token = this.authStore.getAccessToken();
          resource.headers.set('Authorization', `Bearer ${token}`);
          return resource;
        },
      },
      // TODO: move to config and pull from env variable
      'http://localhost:1337',
    );
    this.authStore = new AuthStore(this);
  }
}
