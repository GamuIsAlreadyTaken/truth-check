import { DB, dbClient } from "$lib/database/database";
import type {
  Resource as Resource_,
  Resource_version,
  User,
} from "$lib/database/database";
/*
  Resource CRUD

model Resource {
  id                 Int                @id @default(autoincrement())
  creationDate       Int //Creation time
  // Resources are created by users
  author             User               @relation("author", fields: [authorID], references: [id], onDelete: Cascade)
  authorID           Int
  // Users can like resources to follow them
  userWhoLiked       User[]             @relation("like")
  // Resources are version controlled
  versions           Resource_version[] @relation("version")
  hasVisibleVersions Boolean            @default(true) // To speed up searching for visible resources
}

*/

// Need a way to have a unified form of reosurce where resource version is already inside it

type ResourceCreateInput = DB.Resource_versionCreateInput;
export const ResourceController = {
  create(
    { name, description, imageURI }: DB.Resource_versionCreateInput,
    user: User,
  ) {
    dbClient.resource.create({
      data: {
        versions: {
          create: {
            data,
            description,
            imageURI,
            name,
            updatedAt,
            isVisible,
            version: 1
          },
        },
      },
    });
  },
};

/*
  Resource_version CRUD

model Resource_version {
  version    Int      @default(1)
  resource   Resource @relation("version", fields: [resourceId], references: [id], onDelete: Cascade)
  resourceId Int

  updatedAt   Int //Creation time
  isVisible   Boolean @default(true)
  // Data
  name        String
  description String
  imageURI    String
  data        Json

  @@id([version, resourceId])
}

*/
