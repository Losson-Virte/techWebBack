import { Module } from '@nestjs/common';
import {UserModule} from './user/user.module';
import {MongooseModule, MongooseModuleOptions} from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ComposantModule } from './composant/composant.module';
import * as Config from 'config';

@Module({
  imports: [
      UserModule,
      MongooseModule.forRoot(Config.get<string>('mongodb.uri'), Config.get<MongooseModuleOptions>('mongodb.options')),
      AuthModule,
      ComposantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
