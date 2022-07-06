import db from "../db/db.ts";
import { ForeignKey } from "../types/types.interface.ts";


export interface UserSchema {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  likedResources: ForeignKey[];
  docVersion: number;
  isDisabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const User = db.getDatabase.collection<UserSchema>("users");
