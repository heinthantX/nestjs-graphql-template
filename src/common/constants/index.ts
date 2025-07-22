export interface ENV_CONFIG {
  DATABASE_URL: string;
}

export const PROVIDERS = {
  DRIZZLE_ORM: Symbol('DRIZZLE_ORM'),
  DB_CONNECTION: Symbol('DB_CONNECTION'),
} as const;
