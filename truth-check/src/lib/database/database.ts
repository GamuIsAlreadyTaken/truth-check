import { Prisma, PrismaClient } from "@prisma/client";
export type { Resource_, Resource_version, User, Token } from "@prisma/client";

export const dbClient = new PrismaClient();
export { Prisma as DB };

// TODO add middlewares :)
//  - For soft delete
//  - For soft update
//  - For version control on updates
// Maybe its not necesary, if controllers are used instead
