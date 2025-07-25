import { Inject, Injectable } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { APIError } from 'better-auth/api';
import { fromNodeHeaders } from 'better-auth/node';
import { AuthService as BetterAuthService } from '@thallesp/nestjs-better-auth';
import { auth } from '../better-auth/auth';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/role.decorator';
import { UserRole } from '../dto/enum/user-role';

/**
 * Type representing a valid user session after authentication
 * Excludes null and undefined values from the session return type
 */

/**
 * NestJS guard that handles authentication and authorization for protected routes
 * Can be configured with @Public() or @Optional() or @Roles() decorators to modify authentication behavior
 */
@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    @Inject(Reflector)
    private readonly reflector: Reflector,
    private readonly betterAuthService: BetterAuthService<typeof auth>,
  ) {}

  /**
   * Validates if the current request is authenticated
   * Attaches session and user information to the request object
   * @param context - The execution context of the current request
   * @returns True if the request is authorized to proceed, throws an error otherwise
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('PUBLIC', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const session = await this.betterAuthService.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    request['session'] = session;
    request['user'] = session?.user ?? null; // useful for observability tools like Sentry

    const isOptional = this.reflector.getAllAndOverride<boolean>('OPTIONAL', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isOptional && !session) return true;

    if (!session)
      throw new APIError(401, {
        code: 'UNAUTHORIZED',
        message: 'Unauthorized',
      });

    const roles = this.reflector.getAllAndOverride<{
      allowed: UserRole[];
      notAllowed: UserRole[];
    }>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (
      (roles?.notAllowed &&
        roles.notAllowed.includes(session.user.role as UserRole)) ||
      (roles?.allowed?.length &&
        !roles.allowed.includes(session.user.role as UserRole))
    ) {
      throw new APIError(403, {
        code: 'FORBIDDEN',
        message: 'Forbidden',
      });
    }

    return true;
  }
}
