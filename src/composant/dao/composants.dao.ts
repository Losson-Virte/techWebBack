import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Composant } from '../interfaces/composant.interface';
import { UpdateComposantDto } from '../dto/update-composant.dto';
import { CreateComposantDto } from '../dto/create-composant.dto';

@Injectable()
export class ComposantsDao {
  constructor(@InjectModel('Composant') private readonly _composantModel: Model<Composant>) {}

  find(): Observable<Composant[] | void> {
    return from(this._composantModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  findById(id: string): Observable<Composant | void> {
    return from(this._composantModel.findById(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  create(composant: CreateComposantDto): Observable<Composant> {
    return from(this._composantModel.create(composant))
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

  findByIdAndUpdate(id: string, composant: UpdateComposantDto): Observable<Composant | void> {
    return from(this._composantModel.findByIdAndUpdate(id, composant, { new: true }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  findByIdAndRemove(id: string): Observable<Composant | void> {
    return from(this._composantModel.findByIdAndRemove(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }
}
