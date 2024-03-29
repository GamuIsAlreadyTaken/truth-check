import { Value } from "./types.ts";

export interface ResourceStructure {
  //Indexing info
  id: string;
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
export interface CreateResourceStructure {
  authorId: string;  // is it really necesary
  name: string;
  description: string;
  imageURI: string;
  data: Record<string, Value | Value[]>;
  isPublic: boolean;
}
export interface UpdateResourceStructure {
  name?: string;
  description?: string;
  imageURI?: string;
  data?: Record<string, Value | Value[]>;
  isPublic?: boolean;
}