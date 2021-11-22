import * as coreHttp from "@azure/core-http";
import { ItemController } from "./operations";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { UsufructContext } from "./usufructContext";
import {
  UsufructOptionalParams,
  SignUpDto,
  SignInDto,
  UsufructSignInResponse,
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
    this.itemController = new ItemController(this);
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

  itemController: ItemController;
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const signUpOperationSpec: coreHttp.OperationSpec = {
  path: "/api/auth/sign-up",
  httpMethod: "POST",
  responses: { 200: {} },
  requestBody: Parameters.body,
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
  requestBody: Parameters.body1,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const verifyUserOperationSpec: coreHttp.OperationSpec = {
  path: "/api/verification",
  httpMethod: "POST",
  responses: { 200: {}, 401: {} },
  requestBody: Parameters.body2,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};