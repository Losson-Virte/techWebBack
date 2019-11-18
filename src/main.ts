import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import * as Config from 'config';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {UserModule} from './user/user.module';
import {AppConfig} from './interfaces/app-config.interface';
import {SwaggerConfig} from './interfaces/swagger-config.interface';

async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: true }),
  );

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
  );

  const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addTag(swaggerConfig.tag)
      .build();

  const autoConfigDocument = SwaggerModule.createDocument(app, options, {
      include: [UserModule],
  });

  SwaggerModule.setup(swaggerConfig.path, app, autoConfigDocument);
  await app.listen(config.port, config.host);
  Logger.log(`Application served at http://${config.host}:${config.port}`, 'bootstrap');
}

bootstrap(Config.get<AppConfig>('server'), Config.get<SwaggerConfig>('swagger'));
