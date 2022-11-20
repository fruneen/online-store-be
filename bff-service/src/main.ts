import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';

const port = process.env.PORT || 4001;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());

  await app.listen(port);
};

bootstrap().then(() => console.log('App is running on %s port', port));
