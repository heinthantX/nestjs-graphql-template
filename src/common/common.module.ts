import { Global, Module } from '@nestjs/common';
import { DrizzleModule } from './db/drizzle.module';
import { services } from './services';

@Global()
@Module({
  imports: [DrizzleModule],
  providers: [...services],
  exports: [...services, DrizzleModule],
})
export class CommonModule {}
