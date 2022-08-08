import { roleRights } from "../config/roles.ts";
import { Status, RouterMiddleware } from "../deps.ts";
import type { RouterContext } from "../deps.ts";
import JwtHelper from "../helpers/jwt.helper.ts";
import UserService from "../services/user.service.ts";
import type { UserStructure } from "../types/types.ts";
import { throwError } from "./errorHandler.middleware.ts";

/**
 * Check user Rights
 * @param requiredRights
 * @param user
 * @returns boolean | Error Returns if user has sufficient rights
 */
const checkRights = (
  requiredRights: string[],
  user: UserStructure,
): boolean | Error => {
  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.some((requiredRight) =>
      userRights.includes(requiredRight)
    );
    if (!hasRequiredRights) {
      return throwError({
        status: Status.Forbidden,
        name: "Forbidden",
        path: `access_token`,
        param: `access_token`,
        message: `Insufficient rights`,
        type: "Forbidden",
      });
    }
  }
  return true;
};

export const auth = <T extends string>(requiredRights: string[]): RouterMiddleware<T> =>
  async (
    context: RouterContext<T>,
    next: () => Promise<unknown>,
  ) => {
    const jwt: string = context.request.headers.get("Authorization") ?? ''
    if (!(jwt && jwt.includes("Bearer"))) {
      throwError({
        status: Status.Unauthorized,
        name: "Unauthorized",
        path: `access_token`,
        param: `access_token`,
        message: `access_token is required`,
        type: "Unauthorized",
      });
    }
    const JWT = jwt.split("Bearer ")[1];
    const data = await JwtHelper.getJwtPayload(JWT);
    if (!data) {
      throwError({
        status: Status.Unauthorized,
        name: "Unauthorized",
        path: `access_token`,
        param: `access_token`,
        message: `access_token is invalid`,
        type: "Unauthorized",
      });
    }
    const user: UserStructure | Error = await UserService.getOne(data.id as string);
    if (user && checkRights(requiredRights, user as UserStructure)) {
      context.state = user;
    }

    await next();
  };

  // export const pageAuth = async (ctx: Context)=>{
  //   const jwt: string = ctx.request.headers.get("Authorization") ?? ''
  //   if (!(jwt && jwt.includes("Bearer"))) {
  //     return false
  //   }
  //   const JWT = jwt.split("Bearer ")[1];
  //   try{
  //     var data: any | Error = await JwtHelper.getJwtPayload(JWT);
  //   }catch{}
  //   return !!data
  // }
