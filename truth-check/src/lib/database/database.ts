import { PrismaClient, Prisma } from '@prisma/client'

export const prisma = new PrismaClient()

// TODO add middlewares :)
//  - For soft delete
//  - For soft update
//  - For version control on updates

