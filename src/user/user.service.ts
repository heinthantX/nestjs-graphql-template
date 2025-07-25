import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../common/db/drizzle.service';
import { AuthService as BetterAuthService } from '@thallesp/nestjs-better-auth';
import { auth } from '../auth/better-auth/auth';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly db: DrizzleService,
    private readonly betterAuthService: BetterAuthService<typeof auth>,
  ) {}

  // findOne(params: Partial<typeof users.$inferSelect>) {
  //   const keys = Object.keys(params);
  //   const whereClause = keys.map((key) => eq(users[key], params[key]));
  //   const where = whereClause.length > 0 ? and(...whereClause) : undefined;
  //   return this.db.query.users.findFirst({
  //     where,
  //   });
  // }

  update(dto: UpdateUserDto, headers: Headers) {
    const { isDesigner, image, name } = dto;
    return this.betterAuthService.api.updateUser({
      body: {
        isDesigner,
        image,
        name,
      },
      headers,
    });
  }
}
