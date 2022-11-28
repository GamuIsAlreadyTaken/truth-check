// CRUD
import { DB, dbClient } from "$lib/database/database";
import type { Token, User } from "$lib/database/database";
import { createSecret } from "$lib/cripto/cripto.util";
/*
model Token {
  date DateTime @default(now()) @updatedAt
  hasExpired Boolean @default(true)
  key  String

  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId Int  @id
}
*/

export type Key = string

export const TokenController = {
  getSession(userId: User['id']){
    return dbClient.token.findUnique({
      where: {
        userId
      }
    })
  },
  async createToken(userId: User["id"]) {
    // create a new secret
    const secret: Key = await createSecret() 
    // upsert a token to db
    // return token
    return dbClient.token.upsert({
      where: {
        userId
      },
      create: {
        key: secret,
        hasExpired: false,
        userId: userId
      },
      update: {
        key: secret
      }
    })
  },
  invalidateToken(userId: User['id']){
    return dbClient.token.update({
      where: {
        userId
      },
      data: {
        hasExpired: true,
      }
    })
  }
};

// TEST if it does what i think