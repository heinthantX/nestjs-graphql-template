import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getClient } from '../../common/db/drizzle.service';
import { openAPI, bearer, anonymous } from 'better-auth/plugins';
import schema from '../../common/db/schema';
import 'dotenv/config';

export const auth = betterAuth({
  database: drizzleAdapter(getClient(), {
    provider: 'pg', // or "mysql", "sqlite"
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [openAPI(), bearer(), anonymous()],
});
