import { Bson, Status } from "../deps.ts";
import { renameKey } from '../helpers/type.helper.ts'
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import log from "../middlewares/logger.middleware.ts";
import { Resource, ResourceSchema } from "../models/resource.model.ts";
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
      res => renameKey('_id', 'id', res) //test
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
    state: Record<string, string>,
    options: UpdateResourceStructure,
  ) {
    const resource = await throwIfNotFound(
      'update',
      { _id: id },
      { id, state, options }
    )

    const { documentVersion, name, _id } = resource;
    const newDocVersion = documentVersion + 1;
    const updateDate = new Date();
    log.debug(`Updating resource ${name} (${_id})`)
    const result = await Resource.updateOne({ _id: new Bson.ObjectId(id) }, {
      $set: {
        ...options,
        documentVersion: newDocVersion,
        updateDate
      },
    });
    if (!result) {
      return throwForNotCompleted('update', { id, state, options })
    }
    return result;
  }
  public static async removeOne(id: string){
    const resource = await throwIfNotFound(
      'update',
      { _id: id },
      { id }
    )
    const deleteCount = await Resource.deleteOne({
      _id: new Bson.ObjectId(id),
    });
    //dont delete it, just move it somewhere
    if (!deleteCount) {
      return throwError({
        status: Status.BadRequest,
        name: "BadRequest",
        path: "user",
        param: "user",
        message: `Could not delete user`,
        type: "BadRequest",
      });
    }
    return deleteCount;
  }

}
async function throwIfExists(
  action: string,
  search: Partial<ResourceSchema>,
  param: any) {
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
  param: any) {
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
  param: any,
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