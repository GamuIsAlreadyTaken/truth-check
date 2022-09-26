import { DB, dbClient } from "$lib/database/database";
import type { Resource_, Resource_version, User } from "$lib/database/database";
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

// Need a way to have a unified form of reosurce where resource version is already inside it

type Resource = Resource_ & {
  versions: Omit<Resource_version, "resourceId">[];
};

let a: Resource = {
  id: 0,
  authorID: 0,
  creationDate: 0,
  hasVisibleVersions: false,
  versions: [
    {
      version: 0,
      data: {}, //
      description: "", //
      imageURI: "", //
      isVisible: false, //
      name: "", //
      updatedAt: 0,
    },
  ],
};

let b: Resource_version = {
  data: {},
  description: "",
  imageURI: "",
  isVisible: true,
  name: "",

  resourceId: 0,
  updatedAt: 0,
  version: 0,
};

const versionMask = {
  data: true,
  description: true,
  imageURI: true,
  isVisible: true,
  name: true,
  updatedAt: true,
  version: true,
};

type ResourceInput = Pick<
  DB.Resource_versionCreateInput,
  "data" | "description" | "imageURI" | "isVisible" | "name"
>;

export const ResourceController = {
  async create(userId: User["id"], resource: ResourceInput) {
    const updatedUser = await dbClient.user.update({
      where: {
        id: userId,
      },
      data: {
        createdResources: {
          create: {
            creationDate: Date.now(),
            hasVisibleVersions: resource.isVisible,
            versions: {
              create: {
                version: 0,
                updatedAt: Date.now(),
                ...resource,
              },
            },
          },
        },
      },
      include: {
        createdResources: {
          include: {
            versions: {
              select: versionMask,
            },
          },
        },
      },
    });
    return updatedUser.createdResources[0];
  },
  /**By cursor */
  async getMany(cursor: Resource["id"], amount: number) {
    let foundResources = await dbClient.resource_.findMany({
      cursor: {
        id: cursor,
      },
      skip: 1,
      take: amount,
      include: {
        versions: {
          select: versionMask,
        },
      },
    });
    return foundResources;
  },
  /**By id */
  async getOne(id: Resource["id"], version: Resource_version["version"]) {
    let foundResource = await dbClient.resource_.findUnique({
      where: {
        id,
      },
      include: {
        versions: {
          select: versionMask,
          where: {
            version,
          },
        },
      },
    });
    return foundResource;
  },
  async update(id: Resource["id"], resource: Partial<ResourceInput>) { // TODO figure out if passing a null value deletes it
    let numberOfVersions = await dbClient.resource_version.count({
      where: {
        resourceId: id
      }
    })

    let updatedResource = await dbClient.resource_.update({
      where: {
        id
      },
      data: {
        versions: {

          create: {
            version: numberOfVersions, // TODO keep with this, update the resource
            /*
              TODO decide if when the name is updated the hole version is duplicated, or if 
              only name is saved with the rest of the fields with undefined, then, when searching for a version 
              it will be constructed as the layers in paint.net
            */
            description: '',
            name: '',
            data: {},
            imageURI: '',
            updatedAt: Date.now(),
            isVisible: true,
          }
        }
      }
    }) 
  },
  delete() {
  },
};
