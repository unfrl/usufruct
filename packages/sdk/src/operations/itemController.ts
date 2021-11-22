import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { Usufruct } from "../usufruct";

/**
 * Class representing a ItemController.
 */
export class ItemController {
  private readonly client: Usufruct;

  /**
   * Initialize a new instance of the class ItemController class.
   * @param client Reference to the service client
   */
  constructor(client: Usufruct) {
    this.client = client;
  }

  /**
   * @param options The options parameters.
   */
  getItems(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getItemsOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getItemsOperationSpec: coreHttp.OperationSpec = {
  path: "/api/items",
  httpMethod: "GET",
  responses: { 200: {} },
  urlParameters: [Parameters.$host],
  serializer
};
