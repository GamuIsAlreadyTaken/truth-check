import { UserController } from "$lib/database/user";
import { TokenController } from "$lib/database/token";
import { checkPassword } from "$lib/cripto/cripto.util";
import type { User } from "$lib/database/database";
import type { Key } from "$lib/database/token";

type Credentials = {
  id: User["id"];
  password?: User["password"];
  key?: Key;
};

const TTL = 10000
// TODO decide a TTL 

export async function authenticate(credentials: Credentials) {
  
  if(credentials.key == undefined && credentials.password == undefined) return false //TODO Error, invalid request
  
  const userToken = await TokenController.getSession(credentials.id);

  // token no existe (eres nuevo)
  if(!userToken) return login(credentials)
  // token ha expirado, fecha -> check if password are equal
  if(hasExpired(userToken.date, TTL)) return login(credentials)
  // token no ha expirado, fecha-> return true
  return userToken.key == credentials.key
}

function hasExpired(date: Date, TTL: number){
  return Date.now() - date.valueOf() > TTL
}


async function login(credentials: Credentials) {
  if (credentials.password == undefined) return false; // TODO error, invalid request

  const user = await UserController.get(credentials.id);
  if (!user) return false; // TODO Error, user does not exists

  const isCorrectPassword = await checkPassword(
    user.password,
    user.salt,
    credentials.password,
  );
  if (!isCorrectPassword) return false; // TODO Error, incorrect password

  return !!(await TokenController.createToken(user.id)).userId;
}
async function logoff(userId: User['id']){
  const token = await TokenController.invalidateToken(userId)
  // Idempotent, doesnt matter if its not logged in
}

// user -> user + pass -> server
// server >db([secret(rand), userId]) -> encrypt(secret[state], userId)=key -> client
// client -> request + key + userId -> server
// server > check(decrypt(key, db(userId)) == userId) -> response -> client
