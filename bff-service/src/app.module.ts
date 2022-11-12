import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RedirectModule } from './redirect/redirect.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), RedirectModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
