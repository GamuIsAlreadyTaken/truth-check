
export interface Resource{
  //Indexing info
  id: string;
  //Maintenance info
  creationDate: Date;
  updateDate?: Date;
  documentVersion: number;
  //Resource info
  author: Author;
  name: string;
  description: string;
  imageURI: string;
  data: Record<string, any>;
  isPublic: boolean;
}

export interface Author{
  id: string;
  name: string;
  email: string;
  role: string;
  likedResources: Resource[]; 
  //TODO Decide how the flow of information is going to be, set the interfaces acordingly (the interfaces are how the client is going to see the response)
  /*IMPLEMENT
    · client asks for id, server returns the resource and all resources that are in the reference chain, if the path gets to a resource already on the list passes to the next
    |- maybe have a depth limit
    |- the server returns a json with all resources, client assembles it (JSON is not built to make graphs, so this has to be the way, the client then assembles the map)
      |- For implementation, back will have the JSON to send and a list of {id + documentVersion} of the resources already on the JSON so as to not duplicate data
  
  */
  isDisabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}