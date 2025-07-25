import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isDesigner?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;
}
