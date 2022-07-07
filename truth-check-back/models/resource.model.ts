
export interface ResourceSchema{
  _id: string;
  author: string;
  name: string;
  description: string;
  imageURI: string;
  docVersion: number;
  isShared: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}