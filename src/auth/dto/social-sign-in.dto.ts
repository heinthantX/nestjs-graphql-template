import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

export class SocialSignInDto {
  @ApiProperty()
  @IsUrl()
  @IsOptional()
  callbackURL?: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  newUserCallbackURL?: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  errorCallbackURL?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  disableRedirect?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  idToken?: string;
}
