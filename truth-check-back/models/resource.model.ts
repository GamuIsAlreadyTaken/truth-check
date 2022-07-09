import db from "../db/db.ts";

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

type Value = string | number | boolean;

export const Resource = db.getDatabase.collection<ResourceSchema>("tokens");