import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../common/db/drizzle.service';
import { EmailSignInDto } from './dto';
import { AuthService as BetterAuthService } from '@thallesp/nestjs-better-auth';
import { auth } from './better-auth/auth';
import { SocialSignInDto } from './dto/social-sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DrizzleService,
    private readonly betterAuthService: BetterAuthService<typeof auth>,
  ) {}

  async signIn(dto: EmailSignInDto, headers: Headers) {
    const { email, password } = dto;

    const user = await this.betterAuthService.api.signInEmail({
      body: {
        email,
        password,
      },
      headers,
    });

    return user;
  }

  async signInSocial(dto: SocialSignInDto = {}, headers: Headers) {
    const res = await this.betterAuthService.api.signInSocial({
      body: {
        provider: 'google',
        ...dto,
        idToken: dto.idToken
          ? {
              token: dto?.idToken,
            }
          : undefined,
      },
      headers,
    });
    return res;
  }

  async anonymousSignIn(headers: Headers) {
    const res = await this.betterAuthService.api.signInAnonymous({
      headers,
    });
    return res;
  }
}
