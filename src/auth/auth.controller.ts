import { Body, Controller, Post, Headers, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailSignInDto } from './dto';
import { SocialSignInDto } from './dto/social-sign-in.dto';
import { Session, UserSession } from '@thallesp/nestjs-better-auth';
import Protected from './decorators/protected.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/sign-in')
  async signIn(
    @Body() dto: EmailSignInDto,
    @Headers() headers: Headers,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.authService.clearSessionCookies(res);
    return this.authService.signIn(dto, headers);
  }

  @Post('social/sign-in')
  async signInSocial(
    @Body() dto: SocialSignInDto,
    @Headers() headers: Headers,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.authService.clearSessionCookies(res);
    return this.authService.signInSocial(dto, headers);
  }

  @Post('anonymous/sign-in')
  async anonymousSignIn(
    @Headers() headers: Headers,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.authService.clearSessionCookies(res);
    return this.authService.anonymousSignIn(headers);
  }

  @Get('get-session')
  @Protected()
  getSession(@Session() session: UserSession) {
    return session;
  }
}
