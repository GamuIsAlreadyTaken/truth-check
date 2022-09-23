import { DB, dbClient } from "$lib/database/database";
import type { User } from "$lib/database/database";
import { saltHash } from "$lib/cripto/cripto.util";
/*
  User CRUD

  model User {
  id               Int        @id @default(autoincrement())
  lastUpdate       Int? //update time
  creationDate     Int //creation time
  // Data
  name             String
  email            String //Private
  password         String //Private
  salt             String //Private
  // Resources are created by users
  createdResources Resource[] @relation("author")
  // Users can like resources to follow them
  likedResource    Resource[] @relation("like")
}
*/

// Create user, param user: User
// add createdResource, param resource: Resource
// like likedResource, param resource: Resource
// dislike likedResource, param resource: Resource
type UserId = Pick<User, "id">;

export const UserController = {
  async create({ name, email, password }: DB.UserCreateInput) {
    let { salt, hashedPassword } = await saltHash(password);
    return dbClient.user.create({
      data: {
        name,
        email,
        salt,
        password: hashedPassword,
        creationDate: Date.now(),
      },
    });
  },
  get({ id }: UserId) {
    return dbClient.user.findUnique({
      where: {
        id,
      },
    });
  },
  update(user: User) {
    return dbClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
        lastUpdate: Date.now(),
      },
    });
  },
  delete({ id }: UserId) {
    return dbClient.user.update({
      where: {
        id,
      },
      data: {
        disabled: true,
        lastUpdate: Date.now(),
      },
    });
  },
};
