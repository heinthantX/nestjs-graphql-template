import { pgTable, text } from 'drizzle-orm/pg-core';
import { commonColumns } from '../common/db/schema/common';

export const users = pgTable('users', {
  ...commonColumns,
  email: text('email').unique(),
  password: text('password'),
});
