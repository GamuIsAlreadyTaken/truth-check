import db from "../db/db.ts";
import { Value } from "../types/types.ts";

export interface ResourceSchema {
  //Indexing info
  _id: string;

  //Maintenance info
  creationDate: Date;
  updateDate?: Date;
  documentVersion: number;

  //Resource info
  authorId: string;
  name: string;
  description: string;
  imageURI: string;
  data: Record<string, Value | Value[]>;
  isPublic: boolean;
}


export const DeletedResource =
  db.getDatabase.collection<ResourceSchema>("deletedResources")
export const UpdatedResource =
  db.getDatabase.collection<ResourceSchema>("updatedResources")
export const Resource =
  db.getDatabase.collection<ResourceSchema>("resources");