import { Injectable } from '@nestjs/common';
import { Model, MongooseDocument } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Configuration } from '../interfaces/configuration.interface';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateConfigurationDto } from '../dto/create-configuration.dto';
import { UpdateConfigurationDto } from '../dto/update-configuration.dto';

@Injectable()
export class ConfigurationDao {
  constructor(@InjectModel('Configuration') private readonly _configurationModel: Model<Configuration>) {}

  find(): Observable<Configuration[] | void> {
    return from(this._configurationModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  findById(id: string): Observable<Configuration | void> {
    return from(this._configurationModel.findById(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  create(configuration: CreateConfigurationDto): Observable<Configuration> {
    return from(this._configurationModel.create(configuration))
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

  findByIdAndUpdate(id: string, configuration: UpdateConfigurationDto): Observable<Configuration | void> {
    return from(this._configurationModel.findByIdAndUpdate(id, configuration, { new: true }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  findByIdAndRemove(id: string): Observable<Configuration | void> {
    return from(this._configurationModel.findByIdAndRemove(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }
}
