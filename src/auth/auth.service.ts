import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services';
import { TypedConfigService } from '../shared/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: TypedConfigService,
    private readonly prismaService: PrismaService,
  ) {}
}
