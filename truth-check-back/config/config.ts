import { configSync } from '../deps.ts';

const env: string = Deno.env.get('ENV') || 'development';
const envPath: string = `environments/.env.${env}`.toString();

configSync({
  path: envPath,
  export: true,
});


const config: ({
  env: string;
  jwtAccessExpiration: number;
  jwtRefreshExpiration: number;
  port: number;
  dbName: string;
  mongoUrl: string;
  maxItemsPerResponse: number;
}) = {
  env,
  jwtAccessExpiration: Number(get('JWT_ACCESS_TOKEN_EXP')),
  jwtRefreshExpiration: Number(get('JWT_REFRESH_TOKEN_EXP')),
  port: Number(get('PORT')),
  dbName: get('DB_NAME'),
  mongoUrl: `mongodb+srv://${get('DB_USER')}:${get('DB_PASSWORD')}@${get('DB_NAME')}.${get('DB_SHARD')}/?authMechanism=SCRAM-SHA-1`,
  maxItemsPerResponse: get('MAX_ITEMS_PER_RESPONSE')
};

function get<T = string>(name: string) {
  return Deno.env.get(name) as unknown as T
}

export default config;
