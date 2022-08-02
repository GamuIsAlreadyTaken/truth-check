
export interface Resource{
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
  data: Record<string, any>;
  isPublic: boolean;
}
