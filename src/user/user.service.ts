import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../common/db/drizzle.service';
import { users } from './schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(private readonly db: DrizzleService) {}

  findOne(params: Partial<typeof users.$inferSelect>) {
    const keys = Object.keys(params);
    const whereClause = keys.map((key) => eq(users[key], params[key]));
    const where = whereClause.length > 0 ? and(...whereClause) : undefined;
    return this.db.query.users.findFirst({
      where,
    });
  }
}
