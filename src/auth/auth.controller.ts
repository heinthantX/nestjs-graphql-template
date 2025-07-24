import { Body, Controller, Post, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailSignInDto } from './dto';
import { SocialSignInDto } from './dto/social-sign-in.dto';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/sign-in')
  async signIn(@Body() dto: EmailSignInDto, @Headers() headers: Headers) {
    return this.authService.signIn(dto, headers);
  }

  @Post('social/sign-in')
  async signInSocial(
    @Body() dto: SocialSignInDto,
    @Headers() headers: Headers,
  ) {
    return this.authService.signInSocial(dto, headers);
  }

  @Post('anonymous/sign-in')
  async anonymousSignIn(@Headers() headers: Headers) {
    return this.authService.anonymousSignIn(headers);
  }

  @Post('get-session')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getSession(@Session() session: UserSession) {
    return session;
  }
}
