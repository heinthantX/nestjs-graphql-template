import { Global, Module } from '@nestjs/common';
import { services } from './services';

@Module({
  providers: [...services],
  exports: [...services],
})
@Global()
export class SharedModule {}
