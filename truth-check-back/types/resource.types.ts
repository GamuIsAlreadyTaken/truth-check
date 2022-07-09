type Value = string | number | boolean;
export interface ResourceStructure{
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
export interface CreateResourceStructure{
  authorId: string;
  name: string;
  description: string;
  imageURI: string;
  data: Record<string, Value | Value[]>;
  isPublic: boolean;
}
export interface UpdateResourceStructure{
  name?: string;
  description?: string;
  imageURI?: string;
  data?: Record<string, Value | Value[]>;
  isPublic?: boolean;
}