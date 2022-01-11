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
import { AuthStore } from '../stores';

const API_BASE_PATH =
  import.meta.env.VITE_API_BASE_PATH?.toString() ?? 'http://localhost:1337';

// TODO: maybe we can move this to a middleware and have the auto-run defined there -- just to get it out of the store
const LIBRARY_ID_HEADER =
  import.meta.env.VITE_LIBRARY_ID_HEADER?.toString() ?? 'x-usufruct-library-id';

export class ApiClient {
  public readonly auth: AuthApi;
  public readonly categories: CategoriesApi;
  public readonly items: ItemsApi;
  public readonly labels: LabelsApi;
  public readonly libraries: LibrariesApi;
  public readonly users: UsersApi;
  public readonly verification: VerificationApi;

  private libraryId: string = '';

  public constructor() {
    const configuration = new Configuration({
      basePath: API_BASE_PATH,
      middleware: [
        {
          pre: (context) => {
            context.init.headers = Object.assign({}, context.init.headers, {
              Authorization: `Bearer ${AuthStore.getAccessToken()}`,
              [LIBRARY_ID_HEADER]: this.libraryId,
            });

            return Promise.resolve();
          },
        },
      ],
    });

    this.auth = new AuthApi(configuration);
    this.categories = new CategoriesApi(configuration);
    this.items = new ItemsApi(configuration);
    this.labels = new LabelsApi(configuration);
    this.libraries = new LibrariesApi(configuration);
    this.users = new UsersApi(configuration);
    this.verification = new VerificationApi(configuration);
  }

  public setLibraryId(libraryId: string) {
    this.libraryId = libraryId;
  }

  public clearLibraryId() {
    this.libraryId = '';
  }
}

export const client = new ApiClient();
