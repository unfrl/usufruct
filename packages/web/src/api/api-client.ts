import {
  AuthApi,
  CategoriesApi,
  Configuration,
  ItemsApi,
  LabelsApi,
  LibrariesApi,
  UsersApi,
  VerificationApi,
} from '@unfrl/usufruct-sdk';

const API_BASE_PATH =
  import.meta.env.VITE_API_BASE_PATH?.toString() ?? 'http://localhost:1337';

export class ApiClient {
  public readonly auth: AuthApi;
  public readonly categories: CategoriesApi;
  public readonly items: ItemsApi;
  public readonly labels: LabelsApi;
  public readonly libraries: LibrariesApi;
  public readonly users: UsersApi;
  public readonly verification: VerificationApi;

  public constructor(private _accessToken: string = '') {
    const configuration = new Configuration({
      basePath: API_BASE_PATH,
      accessToken: () => this._accessToken,
    });

    this.auth = new AuthApi(configuration);
    this.categories = new CategoriesApi(configuration);
    this.items = new ItemsApi(configuration);
    this.labels = new LabelsApi(configuration);
    this.libraries = new LibrariesApi(configuration);
    this.users = new UsersApi(configuration);
    this.verification = new VerificationApi(configuration);
  }

  public setAccessTokenHeader(token: string) {
    this._accessToken = token;
  }
}

export const client = new ApiClient();
