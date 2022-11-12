import { CacheModule, Module } from '@nestjs/common';

import { RedirectController } from './redirect.controller';
import { RedirectService } from './services';

@Module({
  imports: [CacheModule.register()],
  providers: [RedirectService],
  exports: [RedirectService],
  controllers: [RedirectController],
})
export class RedirectModule {}
