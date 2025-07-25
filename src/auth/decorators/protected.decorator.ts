import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { Roles } from './role.decorator';
import { UserAuthGuard } from '../guards';
import { UserRole } from '../dto/enum/user-role';

// Combines authentication guard, bearer auth documentation and role-based authorization into a single decorator
export default function Protected(
  ...roles: (UserRole | { not: UserRole[] })[]
) {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(UserAuthGuard),
    Roles(...roles),
  );
}
