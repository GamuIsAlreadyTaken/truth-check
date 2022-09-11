import db from "../db/db.ts";
import { ForeignKey } from "../types/types.ts";


export interface UserSchema {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  likedResources: ForeignKey[];
  
  isDisabled: boolean;
  docVersion: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const User = db.getDatabase.collection<UserSchema>("users");
