import { Bson } from "../deps.ts";

//#region General types
export interface UpdatedStructure {
  matchedCount: number;
  modifiedCount: number;
  upsertedId: typeof Bson.ObjectId | null;
}
export interface Err {
  status: number;
  name: string;
  path: string;
  param: unknown;
  message: string;
  type: string;
}
export interface ForeignKey {
  referencedCollection: string;
  referencedResource: string;
}
//#endregion

//#region Auth types
export interface TokenStructure {
  access: { expires: Date; token: string };
  refresh: { expires: Date; token: string };
}
export interface JwtPayload {
  iss: string;
  iat: number;
  id: string;
  exp: number;
}
export interface LoginStructure {
  tokens: TokenStructure | Error;
  user: UserStructure;
}
//#endregion

//#region User types
export interface UserStructure {
  id: string;
  name: string;
  email: string;
  role: string;
  likedResources: ForeignKey[];
  isDisabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CreateUserStructure {
  name: string;
  email: string;
  password: string;
}
export interface UpdateUserStructure {
  name?: string;
  isDisabled?: boolean;
  likedResources?: { add?: ForeignKey[]; remove?: ForeignKey[] };
}

