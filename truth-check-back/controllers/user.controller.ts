import { roles } from "../config/roles.ts";
import type { RouterContext } from "../deps.ts";
import log from "../middlewares/logger.middleware.ts";
import UserService from "../services/user.service.ts";
import { Status } from "../deps.ts";

class UserController {
  public static async create(
    { request, response }: RouterContext<string>,
  ) {
    const body = request.body();
    const {
      name,
      email,
      password,
    } = await body.value;
    log.debug("Creating user");
    response.body = await UserService.createOne({
      name,
      email,
      password,
    });
    response.status = Status.Created;
  }
  /** Get all users */
  public static async fetch(
    { response }: RouterContext<string>,
  ) {
    log.debug("Getting users list");
    response.body = await UserService.getMany();
  }

  /** Get me */
  public static me({ state, response }: RouterContext<string>): void {
    log.debug("Getting me data");
    response.body = state;
  }

  /** Get a user given an id */
  public static async show(
    { params, response }: RouterContext<string>,
  ) {
    const { id } = params;
    log.debug("Getting user");
    response.body = await UserService.getOne(id as string);
  }

  /** Update user */
  public static async update(
    { params, request, response, state }: RouterContext<string>,
  ) {
    const { id } = params;
    const body = request.body();
    const { name, isDisabled, likedResources } = await body.value;
    log.debug("Updating user");
    await UserService.updateOne(id as string, state, {
      name,
      isDisabled,
      likedResources,
    });
    response.body = await UserService.getOne(id as string);
  }
  public static async updateMe(
    { request, response, state }: RouterContext<string>,
  ) {
    const { id } = state;
    const body = request.body();
    const { name } = JSON.parse(await body.value);
    log.debug(`Updating me ${JSON.parse(await body.value).name}`);
    await UserService.updateOne(id as string, state, {
      name,
      // isDisabled,
      // likedResources,
    });
    response.body = await UserService.getOne(id as string);
  }

  /** Delete user */
  public static async removeMe(
    { state, response }: RouterContext<string>,
  ) {
    const { id } = state;
    log.debug("Removing user");
    const deleteCount = await UserService.removeOne(
      id as string,
    );
    response.body = { deleted: deleteCount };
  }
  public static async remove(
    { params, response }: RouterContext<string>,
  ) {
    const { id } = params;
    log.debug("Removing user");
    const deleteCount = await UserService.removeOne(
      id as string,
    );
    response.body = { deleted: deleteCount };
  }
}

export default UserController;
