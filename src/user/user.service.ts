import {ConflictException, Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {User} from './interfaces/user.interface';
import {USER} from '../data/user';
import {Observable, of, throwError} from 'rxjs';
import {catchError, flatMap, map} from 'rxjs/operators';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserEntity} from './entities/user.entity';
import {UsersDao} from './dao/users.dao';

@Injectable()
export class UserService {
    private _user: User[];

    constructor(private readonly _usersDao: UsersDao) {
        this._user = [].concat(USER);
    }

    findAll(): Observable<UserEntity[] | void> {
        return this._usersDao.find()
            .pipe(
                map(_ => !!_ ? _.map(__ => new UserEntity(__)) : undefined),
            );
    }

    findOne(id: string): Observable<UserEntity> {
        return this._usersDao.findById(id)
            .pipe(
                catchError(e => throwError(new UnprocessableEntityException(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(new UserEntity(_)) :
                        throwError(new NotFoundException(`User with id '${id}' not found`)),
                ),
            );
    }

    // TODO: A réctiver lors de la correction de validateUser
    /*
    findByPseudo(pseudo: string) {
      return this._usersDao.findByPseudo(pseudo)
        .pipe(
          catchError(e => throwError(new UnprocessableEntityException(e.message))),
          flatMap(_ =>
            !!_ ?
              of(new UserEntity(_)) :
              throwError(new NotFoundException(`User with pseudo '${pseudo}' not found`)),
          ),
        );
    }
     */

    create(user: CreateUserDto): Observable<UserEntity> {
        return this._addUser(user)
            .pipe(
                flatMap(_ => this._usersDao.create(_)),
                catchError(e =>
                    e.code = 11000 ?
                        throwError(
                            new ConflictException(`User with pseudonyme '${user.pseudo}' already exists`),
                        ) :
                        throwError(new UnprocessableEntityException(e.message)),
                ),
                map(_ => new UserEntity(_)),
            );
    }

    update(id: string, user: UpdateUserDto): Observable<UserEntity> {
        return this._usersDao.findByIdAndUpdate(id, user)
            .pipe(
                flatMap(_ =>
                    !!_ ?
                        of(new UserEntity((_))) :
                        throwError(new NotFoundException(`User with id '${id}' not found`)),
                ),
            );

    }

    delete(id: string): Observable<void> {
        return this._usersDao.findByIdAndRemove(id)
            .pipe(
                catchError(e => throwError(new NotFoundException(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        throwError(new NotFoundException(`User with id '${id}' not found`)),
                ),
            );
    }

    private _addUser(user: CreateUserDto): Observable<UserEntity> {
        return of(user)
            .pipe(
                map(_ =>
                    Object.assign(_, {
                        id: UserService._createId(),
                    }),
                ),
            );
    }

    private static _createId(): string {
        return `${new Date().getTime()}`;
    }
}
