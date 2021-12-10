import * as coreHttp from "@azure/core-http";

export interface Category {
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id: string;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly created: Date;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly updated: Date;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name: string;
}

export interface Item {
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id: string;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly created: Date;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly updated: Date;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name: string;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly description: string;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly categories: Category;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly labels: Label;
}

export interface Label {
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id: string;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly created: Date;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly updated: Date;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name: string;
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly description: string;
}

export interface UpsertItemDto {
  name: string;
  description: string;
  categoryNames: string[];
}

export interface SignUpDto {
  email: string;
  password: string;
  displayName: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface AuthDto {
  accessToken: string;
}

export interface UserDto {
  id: string;
  email: string;
  displayName: string;
}

export interface VerificationDto {
  email: string;
  token: string;
}

export type ItemCategories = Category & {};

export type ItemLabels = Label & {};

/**
 * Contains response data for the getCategories operation.
 */
export type UsufructGetCategoriesResponse = Category[] & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Category[];
  };
};

/**
 * Contains response data for the getItems operation.
 */
export type UsufructGetItemsResponse = Item[] & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Item[];
  };
};

/**
 * Contains response data for the createItem operation.
 */
export type UsufructCreateItemResponse = Item & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Item;
  };
};

/**
 * Contains response data for the getLabels operation.
 */
export type UsufructGetLabelsResponse = Label[] & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Label[];
  };
};

/**
 * Contains response data for the signIn operation.
 */
export type UsufructSignInResponse = AuthDto & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: AuthDto;
  };
};

/**
 * Contains response data for the getMyProfile operation.
 */
export type UsufructGetMyProfileResponse = UserDto & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: UserDto;
  };
};

/**
 * Optional parameters.
 */
export interface UsufructOptionalParams extends coreHttp.ServiceClientOptions {
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
