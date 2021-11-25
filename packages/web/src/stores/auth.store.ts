import { UserDto } from '@unfrl/usufruct-sdk';
import { makeAutoObservable } from 'mobx';
import { RootStore } from './root.store';

export const ACCESS_TOKEN_KEY = 'usufruct.authStore.accessToken';

export enum AuthStatus {
  Initializing,
  Ready,
  Authenticating,
}

export class AuthStore {
  public user: UserDto | null = null;

  public status: AuthStatus = AuthStatus.Initializing;

  public get authenticated() {
    return !!this.user;
  }

  public constructor(private readonly _root: RootStore) {
    makeAutoObservable(this);
    this.initialize();
  }

  public signUp = async (email: string, password: string): Promise<void> => {
    this.setStatus(AuthStatus.Authenticating);

    try {
      await this._root.client.signUp({
        displayName: email,
        email,
        password,
      });
    } finally {
      this.setStatus(AuthStatus.Ready);
    }
  };

  public signIn = async (email: string, password: string): Promise<void> => {
    this.setStatus(AuthStatus.Authenticating);

    try {
      const { accessToken } = await this._root.client.signIn({
        email,
        password,
      });

      this.setAccessToken(accessToken);

      await this.loadUser();
    } finally {
      this.setStatus(AuthStatus.Ready);
    }
  };

  public verifyUser = async (email: string, token: string): Promise<void> => {
    await this._root.client.verifyUser({ email, token });
  };

  public logout = () => {
    this.clearUser();
    this.clearAccessToken();
  };

  private initialize = async () => {
    if (this.getAccessToken()) {
      await this.loadUser();
    }

    this.setStatus(AuthStatus.Ready);
  };

  private loadUser = async () => {
    try {
      const user = await this._root.client.getMyProfile();

      this.setUser(user);
    } catch (error) {
      console.log('failed to get profile, accessToken likely expired', error);
      this.logout();
    }
  };

  private setStatus = (status: AuthStatus) => {
    this.status = status;
  };

  public getAccessToken = (): string => {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? '';
  };

  private setAccessToken = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  };

  private clearAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  private setUser = (user: UserDto) => {
    this.user = user;
  };

  private clearUser = () => {
    this.user = null;
  };
}
