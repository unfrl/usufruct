import { UserDto } from '@unfrl/usufruct-sdk';
import { autorun, makeAutoObservable } from 'mobx';
import { client } from '../api';
import { RootStore } from './root.store';

const ACCESS_TOKEN_KEY = 'usufruct.authStore.accessToken';

export enum AuthStatus {
  Initializing,
  Ready,
  Authenticating,
}

export class AuthStore {
  public accessToken: string = '';

  public user: UserDto | null = null;

  public status: AuthStatus = AuthStatus.Initializing;

  public get authenticated() {
    return !!this.user;
  }

  public constructor(private readonly _root: RootStore) {
    makeAutoObservable(this);

    this.setAccessToken(localStorage.getItem(ACCESS_TOKEN_KEY) ?? '');

    autorun(() => {
      client.setAccessTokenHeader(this.accessToken);

      if (this.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, this.accessToken);
      } else {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
    });

    this.initialize();
  }

  public signUp = async (
    displayName: string,
    email: string,
    password: string,
  ): Promise<void> => {
    this.setStatus(AuthStatus.Authenticating);

    try {
      await client.auth.signUp({
        displayName,
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
      const { accessToken } = await client.auth.signIn({
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
    await client.verification.verifyUser({ email, token });
  };

  public logout = () => {
    this.clearUser();
    this.clearAccessToken();
  };

  private initialize = async () => {
    if (this.accessToken) {
      await this.loadUser();
    }

    this.setStatus(AuthStatus.Ready);
  };

  private loadUser = async () => {
    try {
      const user = await client.users.getMyProfile();

      this.setUser(user);
    } catch (error) {
      console.log('failed to get profile, accessToken likely expired', error);
      this.logout();
    }
  };

  private setStatus = (status: AuthStatus) => {
    this.status = status;
  };

  private setUser = (user: UserDto) => {
    this.user = user;
  };

  private clearUser = () => {
    this.user = null;
  };

  //#region Access token

  private setAccessToken = (token: string) => {
    this.accessToken = token;
  };

  private clearAccessToken = () => {
    this.accessToken = '';
  };

  //#endregion
}
