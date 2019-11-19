import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  imports: [UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
