import { Prisma, PrismaClient } from "@prisma/client";
export type { Resource, Resource_version, User } from "@prisma/client";

export const dbClient = new PrismaClient();
export { Prisma as DB };

// TODO add middlewares :)
//  - For soft delete
//  - For soft update
//  - For version control on updates
