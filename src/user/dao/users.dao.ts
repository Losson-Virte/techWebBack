import { Injectable } from '@nestjs/common';
import {Model, MongooseDocument} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '../interfaces/user.interface';
import { from, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {CreateUserDto} from '../dto/create-user.dto';
import {UpdateUserDto} from '../dto/update-user.dto';

@Injectable()
export class UsersDao {
    constructor(@InjectModel('User') private readonly _userModel: Model<User>) {}

    find(): Observable<User[] | void> {
        return from(this._userModel.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
            );
    }

    findById(id: string): Observable<User | void> {
        return from(this._userModel.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
            );
    }

    // TODO: A corriger, soucis pour trouver dans MongoDB
    /*
    findByPseudo(username: string): Observable<User[] | void> {
        return from(this._userModel.find({pseudo : 'username'}))
          .pipe(
            map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
          );
    }
    */
    create(user: CreateUserDto): Observable<User> {
        return from(this._userModel.create(user))
            .pipe(
                map((doc: MongooseDocument) => doc.toJSON()),
            );
    }

    findByIdAndUpdate(id: string, user: UpdateUserDto): Observable<User | void> {
        return from(this._userModel.findByIdAndUpdate(id, user, { new: true }))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
            );
    }

    findByIdAndRemove(id: string): Observable<User | void> {
        return from(this._userModel.findByIdAndRemove(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
            );
    }
}
