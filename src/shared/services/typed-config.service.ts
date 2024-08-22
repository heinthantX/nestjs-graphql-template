import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_CONFIG } from '../constant';

@Injectable()
export class TypedConfigService extends ConfigService<ENV_CONFIG> {}
