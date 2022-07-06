

import log from "../middlewares/logger.middleware.ts";
import { RouterContext } from "../deps.ts";
//TODO: redo
class ResourceController {
  public static async fetch(
    { request, response }: RouterContext<string>,
  ) {
    // const body = request.body();
    // const value = await body.value;
    // const result: FetchResourceStructure = {};
    // log.debug("Getting resources in bulk");
    // for (const resourceType in value.bulk) {
    //   log.debug(`| Getting ${resourceType}`);
    //   result[resourceType] = [];
    //   for (const id of value.bulk[resourceType]) {
    //     log.debug(`| | Getting ${id}`);
    //     result[resourceType].push(await controllerMap[resourceType].getOne(id));
    //   }
    // }
    // response.body = result;
  }
}

export {
  ResourceController,
};
