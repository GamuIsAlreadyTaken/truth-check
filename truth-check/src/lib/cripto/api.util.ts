import { UserController } from "$lib/database/user";
import { saltRounds, hash } from "$lib/cripto/cripto.util";
import type { User } from "@prisma/client";

type Token = { key: string; date: string };
type Credentials = {id: User['name'], name: User['name']};

export function authenticate({ key, date }: Token, user: Credentials) {

}

async function createUniqueKey(data: string[]) {
  return hash(data.join(""), saltRounds);
}




/*
User authenticates -> password + mail -> server
server responds -> key|encrypt(mail + hashkey + date)|  + date -> client

client asks -> key + date|last date recieved| + petition -> server
server checks -> if[date isOld] return, if[decrypt(key)['date'] != date] return, 
*/