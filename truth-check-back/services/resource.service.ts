import { Bson, Status } from "../deps.ts";
import { renameKey } from '../helpers/type.helper.ts'
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import log from "../middlewares/logger.middleware.ts";
import { Resource, DeletedResource, ResourceSchema, UpdatedResource } from "../models/resource.model.ts";
import type {
  CreateResourceStructure,
  ResourceStructure,
  UpdateResourceStructure
} from "../types/resource.types.ts";

class ResourceService {
  public static async createOne(
    options: CreateResourceStructure,
  ) {
    const {
      authorId,
      name,
    } = options;
    await throwIfExists('create', { authorId, name }, { options })
    const creationDate = new Date();
    const resource = await Resource.insertOne(
      {
        ...options,
        creationDate,
        documentVersion: 1,
      },
    );
    if (!resource) {
      throwForNotCompleted('create', { options })
    }
    return resource;
  }
  public static getMany() {
    return Resource.find().map(
      res => renameKey('_id', 'id', res)
    ) as Promise<ResourceStructure[]>;
  }
  public static async getOne(id: string) {
    const resource = await Resource.findOne(
      { _id: new Bson.ObjectId(id) },
    );
    if (!resource) {
      return throwForNotCompleted('get', { id })
    }

    return renameKey('_id', 'id', resource) as ResourceStructure
  }
  public static async updateOne(
    id: string,
    options: UpdateResourceStructure,
  ) {
    const resource = await throwIfNotFound(
      'update',
      { _id: id },
      { id, options }
    )

    const { documentVersion } = resource;
    const newDocVersion = documentVersion + 1;
    const updateDate = new Date();
    const movedId = UpdatedResource.insertOne(resource) // test if id is saved
    const result = await Resource.updateOne({ _id: new Bson.ObjectId(id) }, {
      $set: {
        ...options,
        documentVersion: newDocVersion,
        updateDate
      },
    });
    if (!result) {
      return throwForNotCompleted('update', { id, options })
    }
    return result;
  }
  public static async removeOne(id: string) {
    const resource = await throwIfNotFound(
      'update',
      { _id: id },
      { id }
    )
    const movedId = await DeletedResource.insertOne(resource) // test if its created with the same id
    const deleteCount = await Resource.delete({
      _id: new Bson.ObjectId(id),
    });
    if (!deleteCount) {
      return throwForNotCompleted('delete', id)
    }
    return deleteCount;
  }

}


//Helpers____
async function throwIfExists(
  action: string,
  search: Partial<ResourceSchema>,
  param: unknown) {
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
async function throwIfNotFound(
  action: string,
  search: Partial<ResourceSchema>,
  param: unknown) {
  const resource = await Resource.findOne(search);
  if (!resource) {
    log.error("Resource not found");
    throwError({
      status: Status.NotFound,
      name: "NotFound",
      path: `Resource.${action}`,
      param,
      message: `Resource not found`,
      type: "NotFound",
    });
  }
  return resource as ResourceSchema
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