import { Injectable } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import schema from './schema';
import { TypedConfigService } from '../services';

function getClient() {
  return class abstract {
    constructor() {
      const configService = new TypedConfigService();
      const pool = new Pool({
        connectionString: configService.get('DATABASE_URL'),
      });
      return drizzle(pool, { schema });
    }
  } as new () => NodePgDatabase<typeof schema>;
}

@Injectable()
export class DrizzleService extends getClient() {}
