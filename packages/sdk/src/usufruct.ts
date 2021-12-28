import * as coreHttp from "@azure/core-http";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { UsufructContext } from "./usufructContext";
import {
  UsufructOptionalParams,
  UsufructGetCategoriesResponse,
  UsufructGetItemsResponse,
  UpsertItemDto,
  UsufructCreateItemResponse,
  UsufructGetItemAttributesResponse,
  UsufructGetItemResponse,
  UsufructGetLabelsResponse,
  SignUpDto,
  SignInDto,
  UsufructSignInResponse,
  UsufructGetMyProfileResponse,
  VerificationDto,
  UsufructGetLibrariesResponse,
  UpsertLibraryDto,
  UsufructCreateLibraryResponse,
  UsufructGetUserMembershipsResponse
} from "./models";

export class Usufruct extends UsufructContext {
  /**
   * Initializes a new instance of the Usufruct class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param $host server parameter
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    $host: string,
    options?: UsufructOptionalParams
  ) {
    super(credentials, $host, options);
  }

  /**
   * Get all categories
   * @param options The options parameters.
   */
  getCategories(
    options?: coreHttp.OperationOptions
  ): Promise<UsufructGetCategoriesResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      getCategoriesOperationSpec
    ) as Promise<UsufructGetCategoriesResponse>;
  }

  /**
   * Get items
   * @param options The options parameters.
   */
  getItems(
    options?: coreHttp.OperationOptions
  ): Promise<UsufructGetItemsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      getItemsOperationSpec
    ) as Promise<UsufructGetItemsResponse>;
  }

  /**
   * Create a new item definition
   * @param body
   * @param options The options parameters.
   */
  createItem(
    body: UpsertItemDto,
    options?: coreHttp.OperationOptions
  ): Promise<UsufructCreateItemResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      createItemOperationSpec
    ) as Promise<UsufructCreateItemResponse>;
  }

  /**
   * Get item attributes
   * @param options The options parameters.
   */
  getItemAttributes(
    options?: coreHttp.OperationOptions
  ): Promise<UsufructGetItemAttributesResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      getItemAttributesOperationSpec
    ) as Promise<UsufructGetItemAttributesResponse>;
  }

  /**
   * Get an item by its short ID
   * @param id
   * @param options The options parameters.
   */
  getItem(
    id: string,
    options?: coreHttp.OperationOptions
  ): Promise<UsufructGetItemResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { id, options: operationOptions },
      getItemOperationSpec
    ) as Promise<UsufructGetItemResponse>;
  }

  /**
   * Get all labels
   * @param options The options parameters.
   */
  getLabels(
    options?: coreHttp.OperationOptions
  ): Promise<UsufructGetLabelsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      getLabelsOperationSpec
    ) as Promise<UsufructGetLabelsResponse>;
  }

  /**
   * Sign up a new user
   * @param body
   * @param options The options parameters.
   */
  signUp(
    body: SignUpDto,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      signUpOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Sign in an existing user
   * @param body
   * @param options The options parameters.
   */
  signIn(
    body: SignInDto,
    options?: coreHttp.OperationOptions
  ): Promise<UsufructSignInResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      signInOperationSpec
    ) as Promise<UsufructSignInResponse>;
  }

  /**
   * Gets the current user profile
   * @param options The options parameters.
   */
  getMyProfile(
    options?: coreHttp.OperationOptions
  ): Promise<UsufructGetMyProfileResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      getMyProfileOperationSpec
    ) as Promise<UsufructGetMyProfileResponse>;
  }

  /**
   * Verify a User using the token emailed to them during account creation
   * @param body
   * @param options The options parameters.
   */
  verifyUser(
    body: VerificationDto,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      verifyUserOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get list of libraries
   * @param options The options parameters.
   */
  getLibraries(
    options?: coreHttp.OperationOptions
  ): Promise<UsufructGetLibrariesResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      getLibrariesOperationSpec
    ) as Promise<UsufructGetLibrariesResponse>;
  }

  /**
   * Create a new library with your user as the owner
   * @param body
   * @param options The options parameters.
   */
  createLibrary(
    body: UpsertLibraryDto,
    options?: coreHttp.OperationOptions
  ): Promise<UsufructCreateLibraryResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { body, options: operationOptions },
      createLibraryOperationSpec
    ) as Promise<UsufructCreateLibraryResponse>;
  }

  /**
   * Get the memberships and libraries for your user
   * @param options The options parameters.
   */
  getUserMemberships(
    options?: coreHttp.OperationOptions
  ): Promise<UsufructGetUserMembershipsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      getUserMembershipsOperationSpec
    ) as Promise<UsufructGetUserMembershipsResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getCategoriesOperationSpec: coreHttp.OperationSpec = {
  path: "/api/categories",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Category" } }
        }
      }
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getItemsOperationSpec: coreHttp.OperationSpec = {
  path: "/api/items",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Item" } }
        }
      }
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const createItemOperationSpec: coreHttp.OperationSpec = {
  path: "/api/items",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.Item
    }
  },
  requestBody: Parameters.body,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const getItemAttributesOperationSpec: coreHttp.OperationSpec = {
  path: "/api/items/attributes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "ItemAttribute" } }
        }
      }
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getItemOperationSpec: coreHttp.OperationSpec = {
  path: "/api/items/{id}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Item
    }
  },
  urlParameters: [Parameters.$host, Parameters.id],
  headerParameters: [Parameters.accept],
  serializer
};
const getLabelsOperationSpec: coreHttp.OperationSpec = {
  path: "/api/labels",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Label" } }
        }
      }
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const signUpOperationSpec: coreHttp.OperationSpec = {
  path: "/api/auth/sign-up",
  httpMethod: "POST",
  responses: { 200: {} },
  requestBody: Parameters.body1,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const signInOperationSpec: coreHttp.OperationSpec = {
  path: "/api/auth/sign-in",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AuthDto
    }
  },
  requestBody: Parameters.body2,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const getMyProfileOperationSpec: coreHttp.OperationSpec = {
  path: "/api/users/me",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UserDto
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const verifyUserOperationSpec: coreHttp.OperationSpec = {
  path: "/api/verification",
  httpMethod: "POST",
  responses: { 200: {}, 401: {} },
  requestBody: Parameters.body3,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const getLibrariesOperationSpec: coreHttp.OperationSpec = {
  path: "/api/libraries",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Library" } }
        }
      }
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const createLibraryOperationSpec: coreHttp.OperationSpec = {
  path: "/api/libraries",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.Library
    }
  },
  requestBody: Parameters.body4,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const getUserMembershipsOperationSpec: coreHttp.OperationSpec = {
  path: "/api/libraries/me",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "LibraryMember" } }
        }
      }
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
