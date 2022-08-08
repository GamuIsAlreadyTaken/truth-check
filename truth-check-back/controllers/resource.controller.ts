import { RouterContext, Status } from "../deps.ts";
import ResourceService from "../services/resource.service.ts";
import log from '../middlewares/logger.middleware.ts'
import { findForeignKeys } from "../helpers/foreignKey.helper.ts";
import type { ResourceStructure } from "../types/resource.types.ts";
import type { FailedReference } from "../types/types.ts";

class ResourceController {
  public static async fetchOne(
    { params, response, state }: RouterContext<string>
  ) {
    const { id, version } = params
    const resource = await ResourceService.getOne(id, parseInt(version))
    if ('error' in resource) return response.status = Status.NotFound

    if (!resource.isPublic && resource.authorId != state.id) {
      return response.status = Status.Unauthorized
    }

    response.body = resource
    response.status = Status.OK
    return resource
  }
  public static async fetchChain(
    { params, response, state }: RouterContext<string>
  ) {
    const resourceList: (ResourceStructure | FailedReference)[] = []

    const resourcesRequested = await this.fetchOne({ params, response, state } as RouterContext<string>)
    if (typeof resourcesRequested == 'number') // Members of enum Status are numbers
      return
    resourceList.push(resourcesRequested)

    const foreignKeys = findForeignKeys(resourcesRequested)

    for (const foreignKey of foreignKeys) {
      params['id'] = foreignKey.foreignId
      params['version'] = foreignKey.documentVersion
      const referencedResource = await this.fetchOne({ params, response, state } as RouterContext<string>)
      if (typeof referencedResource == 'number') {
        // TODO Decide what happens if resource is not found on client side
        resourceList.push({
          ...foreignKey,
          error: 'Resource not found'
        })
        continue
      }
      resourceList.push(referencedResource)
      const referencedResourceForeignKeys = findForeignKeys(referencedResource, foreignKeys)
      foreignKeys.push(...referencedResourceForeignKeys)
    }
    response.body = resourceList
  }
  /*TEST. fetchChain
  
  1. just 1 resource  --> [resource]
  2. a linear chain   --> [...resources].length == resource in chain
  3. a loop           --> same as 2
  4. a broken chain   --> [...resources].length == resources in loop, where broken links are of type FailedReference
  5. a broken loop    --> same as 4
  6. a tree           --> same as 2
  7. a headless chain --> NotFound

  */

  public static async fetchAll(
    { request, response, state }: RouterContext<string>,
  ) {
    const param = request.url.searchParams.get('cursor')
    const lastDate = param ? new Date(param) : new Date()
    
    const resources = await ResourceService.getMany(lastDate)
    const visibleResources = resources.filter(r => r.isPublic || r.authorId == state.id)

    
    response.body = visibleResources
    response.status = Status.OK
  }
  //TEST. fetchAll == ResourceService.getMany
  public static async create(
    { request, response, state }: RouterContext<string>
  ) {
    const body = request.body()
    const {
      name,
      description,
      imageURI,
      data,
      isPublic,
    } = await body.value
    log.debug('creating resource')
    if ([name, description, imageURI, data, isPublic].some(e => e === undefined))
      return response.status = Status.BadRequest

    response.body = await ResourceService.createOne({
      authorId: state.id,
      name,
      description,
      imageURI,
      data,
      isPublic
    })
    response.status = Status.Created;
  }
  public static async update(
    { request, response, params }: RouterContext<string>
  ) {
    const { id } = params

    const body = request.body()
    const {
      name,
      description,
      imageURI,
      data,
      isPublic
    } = await body.value

    if ([name, description, imageURI, data, isPublic].every(e => !e))
      return response.status = Status.BadRequest

    const updateInfo = await ResourceService.updateOne(id, {
      name,
      description,
      imageURI,
      data,
      isPublic
    })

    if ('error' in updateInfo)
      return response.status = Status.NotFound
    if (updateInfo.modifiedCount == 0)
      return response.status = Status.NotModified

    response.status = Status.NoContent;
  }
  public static async delete(
    { response, params }: RouterContext<string>
  ) {
    const { id } = params

    const deleteCount = await ResourceService.removeOne(id)
    if ('error' in deleteCount)
      return response.status = Status.NotFound
    return response.status = Status.NoContent
  }
}

export {
  ResourceController,
};
