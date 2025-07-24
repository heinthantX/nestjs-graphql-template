export interface ENV_CONFIG {
  DATABASE_URL: string;
}

export const PROVIDERS = {
  // DRIZZLE_ORM: Symbol('DRIZZLE_ORM'),
  // DB_CONNECTION: Symbol('DB_CONNECTION'),
  BETTER_AUTH_INSTANCE: Symbol('BETTER_AUTH_INSTANCE'),
} as const;
