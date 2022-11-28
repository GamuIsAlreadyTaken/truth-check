import type { User } from "$lib/database/database";
import { genSalt, hash } from "bcrypt";
export { hash };

export const saltRounds = 10;

export async function saltHash(password: string) {
  let salt = await genSalt(saltRounds);
  let hashedPassword = await hash(password, salt);

  return { salt, hashedPassword };
}

export function createSecret() {
  return genSalt(saltRounds);
}

export async function checkPassword(
  password: User["password"],
  salt: User["salt"],
  check: User["password"],
) {
  const hashedPassword = await hash(password, salt);
  return check === hashedPassword;
}
