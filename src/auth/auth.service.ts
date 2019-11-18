import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { HandlerParams } from '../user/validators/handler-params';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}
/*
  async validateUser(username: string, pass: string): Promise<UserEntity> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
*/
  validateUser(params: HandlerParams): Observable<UserEntity> {
    return this.usersService.findOne(params.id)
      .pipe(

      );
  }
}
