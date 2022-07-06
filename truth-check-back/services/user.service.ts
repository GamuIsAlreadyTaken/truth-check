import { Bson, Status } from "../deps.ts";
import HashHelper from "../helpers/hash.helper.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import log from "../middlewares/logger.middleware.ts";
import { User, UserSchema } from "../models/user.model.ts";
import type {
  CreateUserStructure,
  UpdatedStructure,
  UpdateUserStructure,
  UserStructure,
} from "../types/types.interface.ts";
import { roleRights } from "../config/roles.ts";

class UserService {
  public static async createOne(
    options: CreateUserStructure,
  ) {
    const { name, email, password } = options;
    log.debug('Finding one')
    const userExists: (UserSchema | undefined) = await User.findOne({ email });
    if (userExists) {
      log.error("User already exists");
      return throwError({
        status: Status.Conflict,
        name: "Conflict",
        path: "user",
        param: "user",
        message: `User already exists`,
        type: "Conflict",
      });
    }
    log.debug('Hashing password')
    const hashedPassword = await HashHelper.encrypt(password);
    log.debug('Getting date')
    const createdAt = new Date();
    log.debug('Inserting one')
    const user: string | Bson.ObjectId = await User.insertOne(
      {
        name,
        email,
        password: hashedPassword,
        role: "user",
        isDisabled: false,
        createdAt,
        docVersion: 1,
        likedResources: [],
      },
    );
      log.debug('Done :)')
    if (!user) {
      log.error("Could not create user");
      return throwError({
        status: Status.BadRequest,
        name: "BadRequest",
        path: "user",
        param: "user",
        message: `Could not create user`,
        type: "BadRequest",
      });
    }
    return user;
  }
  public static getMany() {
    return User.find().toArray();
  }
  public static async getOne(id: string) {
    const user: (UserSchema | undefined) = await User.findOne(
      { _id: new Bson.ObjectId(id) },
    );
    if (!user) {
      log.error("User not found");
      return throwError({
        status: Status.NotFound,
        name: "NotFound",
        path: "user",
        param: "user",
        message: `User not found`,
        type: "NotFound",
      });
    }
    const {
      name,
      email,
      role,
      isDisabled,
      createdAt,
      updatedAt,
      likedResources,
    } = user;
    return {
      id,
      name,
      email,
      role,
      isDisabled,
      createdAt,
      updatedAt,
      likedResources,
    } as UserStructure;
  }
  public static async updateOne(
    id: string,
    state: Record<string, string>,
    options: UpdateUserStructure,
  ) {
    const user: (UserSchema | undefined) = await User.findOne(
      { _id: new Bson.ObjectId(id) },
    );
    if (!user) {
      log.error("User not found");
      return throwError({
        status: Status.NotFound,
        name: "NotFound",
        path: "user",
        param: "user",
        message: `User not found`,
        type: "NotFound",
      });
    }
    const { name } = options;
    const userRights: string[] = roleRights.get(state.role);
    if (state.id !== id && !userRights.includes("manageUsers")) {
      return throwError({
        status: Status.Forbidden,
        name: "Forbidden",
        path: `access_token`,
        param: `access_token`,
        message: `Insufficient rights`,
        type: "Forbidden",
      });
    }

    // if (likedResources) {
    //   if (likedResources.add) {
    //     for (const foreignKey of likedResources.add) {
    //       const keyExists = user.likedResources.find(
    //         (key) => equals(key, foreignKey),
    //       );
    //       if (keyExists) continue;
    //       user.likedResources.push(foreignKey);
    //     }
    //   }
    //   if (likedResources.remove) {
    //     for (const foreignKey of likedResources.remove) {
    //       user.likedResources = user.likedResources.filter(
    //         (key) => !equals(key, foreignKey),
    //       );
    //     }
    //   }
    // }

    const { docVersion } = user;
    const newDocVersion = docVersion + 1;
    const updatedAt = new Date();
    log.debug(`Updating user ${name}`)
    const result: ({
      upsertedId: any;
      upsertedCount: number;
      matchedCount: number;
      modifiedCount: number;
    }) = await User.updateOne({ _id: new Bson.ObjectId(id) }, {
      $set: {
        name,
        // isDisabled,
        updatedAt,
        docVersion: newDocVersion,
        // likedResources: user.likedResources,
      },
    });
    if (!result) {
      return throwError({
        status: Status.BadRequest,
        name: "BadRequest",
        path: "user",
        param: "user",
        message: `Could not update user`,
        type: "BadRequest",
      });
    }

    return result as UpdatedStructure;
  }
  public static async removeOne(id: string): Promise<number | Error> {
    const user: (UserSchema | undefined) = await User.findOne(
      { _id: new Bson.ObjectId(id) },
    );
    if (!user) {
      log.error("User not found");
      return throwError({
        status: Status.NotFound,
        name: "NotFound",
        path: "user",
        param: "user",
        message: `User not found`,
        type: "NotFound",
      });
    }
    const deleteCount: number = await User.deleteOne({
      _id: new Bson.ObjectId(id),
    });
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

export default UserService;
