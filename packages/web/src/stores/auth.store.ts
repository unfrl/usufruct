import { makeAutoObservable } from 'mobx';

import { RootStore } from './root.store';

export class AuthStore {
  // TODO: likely will want this as computed when implemented, don't want the value being set anywhere else
  public authenticated: boolean = false;

  public constructor(private readonly _rootStore: RootStore) {
    makeAutoObservable(this);
  }
}
