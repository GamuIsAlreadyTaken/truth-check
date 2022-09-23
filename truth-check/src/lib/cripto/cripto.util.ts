import { genSalt, hash } from "bcrypt";

const saltRounds = 10;

export async function saltHash(password: string) {
  let salt = await genSalt(saltRounds);
  let hashedPassword = await hash(password + salt, saltRounds);

  return { salt, hashedPassword };
}
