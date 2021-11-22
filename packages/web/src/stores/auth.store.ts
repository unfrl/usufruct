import { makeAutoObservable } from 'mobx';
import { RootStore } from './root.store';

const ACCESS_TOKEN_KEY = 'usufruct.authStore.accessToken';

export enum AuthStatus {
  Initializing,
  Ready,
  Authenticating,
}

export class AuthStore {
  // TODO: likely will want this as computed when implemented, don't want the value being set anywhere else
  public authenticated: boolean = false;

  public status: AuthStatus = AuthStatus.Initializing;

  public constructor(private readonly _rootStore: RootStore) {
    makeAutoObservable(this);

    // TODO: reason for status to be "Initializing" is to first refresh the auth status for logged in users
    // for now, just setting ready here until we impl the init
    this.setStatus(AuthStatus.Ready);
  }

  /**
   * Attempts to sign up new user, returning true if successful.
   */
  public signUp = async (email: string, password: string): Promise<void> => {
    this.setStatus(AuthStatus.Authenticating);

    try {
      await this._rootStore.client.signUp({
        displayName: email,
        email,
        password,
      });
    } finally {
      this.setStatus(AuthStatus.Ready);
    }
  };

  private setStatus = (status: AuthStatus) => {
    this.status = status;
  };

  //#region Access token

  public getAccessToken = (): string => {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? '';
  };

  private setAccessToken = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  };

  private clearAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  //#endregion
}
