import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Observable, of, throwError } from 'rxjs';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly _usersService: UserService) {}

  // TODO: A corriger, return un null
  /*
   validateUser(username: string, pass: string): Observable<UserEntity> {
     this._usersService.findByPseudo(username).subscribe(k => {
       this._validatePass(k, pass);
       return of(k);
     });
     return null;
   }
   */

   private _validatePass(user: UserEntity, password: string): Observable<UserEntity> {
      return user.password === password ? of(new UserEntity(user)) : throwError(new NotFoundException('Login incorrect'));
   }
}
