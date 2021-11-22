import * as coreHttp from "@azure/core-http";

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

export interface VerificationDto {
  email: string;
  token: string;
}

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
 * Optional parameters.
 */
export interface UsufructOptionalParams extends coreHttp.ServiceClientOptions {
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}