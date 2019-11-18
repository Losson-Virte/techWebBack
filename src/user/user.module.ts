import {Logger, Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schemas/user.schema';
import { UsersDao } from './dao/users.dao';

@Module({
    imports: [ MongooseModule.forFeature([ { name: 'User', schema: UserSchema } ]) ],
    exports: [ UserService ],
    controllers: [ UserController ],
    providers: [ UserService, Logger, UsersDao ],
})
export class UserModule {}
