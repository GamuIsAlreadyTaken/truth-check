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
  getOne(id: Resource["id"], version: Resource_version["version"]) {
    return dbClient.resource_.findUnique({
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
  },
  async update(id: Resource["id"], resource: Partial<ResourceInput>) {
    let numberOfVersions = await dbClient.resource_version.count({
      where: {
        resourceId: id,
      },
    });

    let updatedResource = await dbClient.resource_.update({
      where: {
        id,
      },
      data: {
        versions: {
          create: {
            version: numberOfVersions,
            updatedAt: Date.now(),
            isVisible: true,
            ...resource,
          },
        },
      },
    });
    return updatedResource
  },
  async deleteLastVersion(id: Resource["id"]) {
    // marcar la ultima version como no visible
    let versionCount = await dbClient.resource_version.count({
      where: {
        resourceId: id,
      },
    });
    let updatedVersion = await dbClient.resource_version.update({
      where: {
        version_resourceId: {
          resourceId: id,
          version: versionCount - 1,
        },
      },
      data: {
        isVisible: false,
      },
    });
    this.checkVisibility(id);
    return updatedVersion;
  },
  async deleteVersion(
    id: Resource["id"],
    version: Resource_version["version"],
  ) {
    // marcar la version indicada como no visible
    let updatedVersion = dbClient.resource_version.update({
      where: {
        version_resourceId: {
          resourceId: id,
          version,
        },
      },
      data: {
        isVisible: false,
      },
    });
    this.checkVisibility(id);
    return updatedVersion;
  },
  async checkVisibility(id: Resource["id"]) {
    // Mantiene actualizada hasVisibleVersions
    let visibleVersions = await dbClient.resource_version.count({
      where: {
        AND: {
          resourceId: id,
          isVisible: true,
        },
      },
    });
    dbClient.resource_.update({
      where: {
        id,
      },
      data: {
        hasVisibleVersions: visibleVersions != 0,
      },
    });
  },
};
