
import { RouterContext, Status } from "../deps.ts";
import ResourceService from "../services/resource.service.ts";
import log from '../middlewares/logger.middleware.ts'
class ResourceController {
  public static async fetchOne(
    { request, response, state }: RouterContext<string>
  ) {
    const id = request.url.searchParams.get('id')
    if (!id) return response.status = Status.BadRequest

    const resource = await ResourceService.getOne(id)
    if (!resource) return response.status = Status.NotFound

    if (!resource.isPublic && resource.authorId != state.id)
      return response.status = Status.Unauthorized

    response.body = resource
    response.status = Status.OK
  }
  public static async fetchAll(
    { response, state }: RouterContext<string>,
  ) {
    const resources = await ResourceService.getMany()
    const visibleResources = resources.filter(r => r.isPublic || r.authorId == state.id)
    response.body = visibleResources
    response.status = Status.OK
  }
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
    if ([name, description, imageURI, data, isPublic].some(e => !e))
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
    { request, response }: RouterContext<string>
  ) {
    const id = request.url.searchParams.get('id')
    if (!id) return response.status = Status.BadRequest

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

    if (!updateInfo || updateInfo.matchedCount == 0)
      return response.status = Status.NotFound
    if (updateInfo.modifiedCount == 0)
      return response.status = Status.NotModified

    response.status = Status.NoContent;
  }
  public static async delete(
    { request, response }: RouterContext<string>
  ) {
    const id = request.url.searchParams.get('id')
    if (!id) return response.status = Status.BadRequest

    const deleteCount = await ResourceService.removeOne(id)
    if (deleteCount == 0)
      return response.status = Status.NotFound
    return response.status = Status.NoContent
  }
}

export {
  ResourceController,
};
