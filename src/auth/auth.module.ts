import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { auth } from './better-auth/auth';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';

@Module({
  imports: [
    BetterAuthModule.forRoot(auth, {
      disableExceptionFilter: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
