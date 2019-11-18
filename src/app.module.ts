import { Module } from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {MongooseModule, MongooseModuleOptions} from "@nestjs/mongoose";
import * as Config from 'config';

@Module({
  imports: [
      UserModule,
      MongooseModule.forRoot(Config.get<string>('mongodb.uri'), Config.get<MongooseModuleOptions>('mongodb.options'))
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
