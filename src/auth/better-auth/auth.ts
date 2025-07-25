import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getClient } from '../../common/db/drizzle.service';
import { bearer, anonymous } from 'better-auth/plugins';
import schema from '../../common/db/schema';
import 'dotenv/config';
import { UserRole } from '../dto/enum/user-role';

export const auth = betterAuth({
  database: drizzleAdapter(getClient(), {
    provider: 'pg', // or "mysql", "sqlite"
    schema,
  }),
  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false,
        defaultValue: UserRole.USER,
        required: true,
      },
      isDesigner: {
        type: 'boolean',
        defaultValue: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      accessType: 'offline',
      prompt: 'select_account+consent',
    },
  },
  plugins: [bearer(), anonymous({})],
});
