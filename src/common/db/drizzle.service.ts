import { Injectable } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import schema from './schema';
import { TypedConfigService } from '../services';

let client: NodePgDatabase<typeof schema>;
export function getClient() {
  if (client) {
    return client;
  }
  const configService = new TypedConfigService();
  const pool = new Pool({
    connectionString: configService.get('DATABASE_URL'),
  });
  client = drizzle(pool, { schema });
  return client;
}

function getClientClass() {
  return class {
    constructor() {
      return getClient();
    }
  } as new () => NodePgDatabase<typeof schema>;
}

@Injectable()
export class DrizzleService extends getClientClass() {}
