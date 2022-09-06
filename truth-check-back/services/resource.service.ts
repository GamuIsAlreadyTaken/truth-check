import { Bson, Status } from "../deps.ts";
import { renameKey } from "../helpers/type.helper.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import log from "../middlewares/logger.middleware.ts";
import {
  DeletedResource,
  Resource,
  ResourceSchema,
  UpdatedResource,
} from "../models/resource.model.ts";
import type {
  CreateResourceStructure,
  ResourceStructure,
  UpdateResourceStructure,
} from "../types/resource.types.ts";
import { FailedReference } from "../types/types.ts";

class ResourceService {
  public static async createOne(
    options: CreateResourceStructure,
  ) {
    const {
      authorId,
      name,
    } = options;
    log.debug("Creating resource");
    await throwIfExists("create", { authorId, name }, { options });
    const creationDate = new Date();
    const resource = await Resource.insertOne(
      {
        ...options,
        creationDate,
        documentVersion: 1,
      },
    );
    if (!resource) {
      throwForNotCompleted("create", { options });
    }
    return resource;
  }
  public static getMany(lastDate = new Date()) {
    const MAX_RESOURCES_PER_CALL = 1;
    return Resource.find({ creationDate: { $lt: lastDate } })
      .sort({ creationDate: -1 })
      .limit(MAX_RESOURCES_PER_CALL)
      .map(
        (res) => renameKey("_id", "id", res),
      ) as Promise<ResourceStructure[]>;
  }
  // TEST.getMany
  /*
    1. without lastDate
    2. with a lastDate greater than the max
    3. with a lastDate lower than the min
    4. make test remember the last date and modify maxResources to 1 and see if its secuencial
    5. make call, add resources, make call
  */
  public static async getOne(id: string, version?: number) {
    const filter: { _id: Bson.ObjectId; documentVersion?: number } = {
      _id: new Bson.ObjectId(id),
    };
    if (version) {
      filter.documentVersion = version;
    }

    const resource = await Resource.findOne(filter) ||
      await UpdatedResource.findOne(filter) ||
      await DeletedResource.findOne(filter);

    if (!resource) {
      return createFailedReference({ _id: id, documentVersion: version });
    }

    return renameKey("_id", "id", resource) as ResourceStructure;
  }
  // TEST. getOne
  /*
    1. with version
    2. without version
    3. with fake id
  */
  public static async updateOne(
    _id: string,
    options: UpdateResourceStructure,
  ) {
    const filter = { _id };
    const resource = await Resource.findOne(filter);
    if (!resource) return createFailedReference({ _id });

    const { documentVersion } = resource;
    const newDocVersion = documentVersion + 1;
    const updateDate = new Date();
    const movedId = UpdatedResource.insertOne(resource); // TEST if id is saved
    log.debug(
      `Test if updated elements are move with the same id,\n originalID: ${_id} == newID: ${movedId}`,
    );

    const result = await Resource.updateOne({ _id }, {
      $set: {
        ...options,
        documentVersion: newDocVersion,
        updateDate,
      },
    });

    return new Number(result.modifiedCount);
  }
  public static async removeOne(_id: string) {
    const filter = { _id };

    const resource = await Resource.findOne(filter);
    if (!resource) return createFailedReference(filter);

    const movedId = await DeletedResource.insertOne(resource); // TEST if its created with the same id
    log.debug(
      `Test if deleted elements are move with the same id,\n originalID: ${_id} == newID: ${movedId}`,
    );

    const deleteCount = await Resource.delete({ _id });

    return new Number(deleteCount)
  }
}

//Helpers____
async function throwIfExists(
  action: string,
  search: Partial<ResourceSchema>,
  param: unknown,
) {
  const resource = await Resource.findOne(search);
  if (resource) {
    log.error("Reosurce already exists");
    throwError({
      status: Status.Conflict,
      name: "Conflict",
      path: `Resource.${action}`,
      param,
      message: `Resource already exists`,
      type: "Conflict",
    });
  }
}
function createFailedReference(
  search: Required<Pick<ResourceSchema, "_id">> & Partial<ResourceSchema>,
) {
  log.error("Resource not found");
  return {
    foreignId: search._id,
    documentVersion: search.documentVersion || "Latest",
    error: "Not Found",
  } as FailedReference;
}
function throwForNotCompleted(
  action: string,
  param: unknown,
) {
  log.error(`Resource not be ${action}`);
  throwError({
    status: Status.BadRequest,
    name: "BadRequest",
    path: `Resource.${action}`,
    param,
    message: `Could not ${action} resource`,
    type: "BadRequest",
  });
}

export default ResourceService;
