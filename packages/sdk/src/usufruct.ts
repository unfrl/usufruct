import * as coreHttp from "@azure/core-http";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { UsufructContext } from "./usufructContext";
import {
  UsufructOptionalParams,
  UsufructGetCategoriesResponse,
  UsufructGetItemsResponse,
  CreateItemDto,
  UsufructCreateItemResponse,
  SignUpDto,
  SignInDto,
  UsufructSignInResponse,
  UsufructGetMyProfileResponse,
  VerificationDto
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
    body: CreateItemDto,
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
