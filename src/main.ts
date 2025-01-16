import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import * as bodyParser from 'body-parser';
import moment from 'moment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/lumel-sales');
  app.use(bodyParser.json({ limit: '500mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // removes the extra property which are coming
      transform: true, // to get plain javascript object
    }),
  );
  const options = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: `Content-Type,Authorization,Cache-Control,x-riseit-application`,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(options);

  await app.listen(configuration().port);
  process.stdout.write(
    `app is running in mode ${configuration().env}-${moment().format(
      'YYYY/MM/DD hh:mm:s A',
    )} - port ${configuration().port}\n`,
  );
}
bootstrap();
