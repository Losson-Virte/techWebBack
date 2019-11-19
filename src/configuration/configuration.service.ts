import { ConflictException, Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { ConfigurationDao } from './dao/configuration.dao';
import { ConfigurationEntity } from './entities/configuration.entity';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';

@Injectable()
export class ConfigurationService {
  constructor(private readonly _configurationsDao: ConfigurationDao) {
  }

  findAll(): Observable<ConfigurationEntity[] | void> {
    return this._configurationsDao.find()
      .pipe(
        map(_ => !!_ ? _.map(__ => new ConfigurationEntity(__)) : undefined),
      );
  }

  findOne(id: string): Observable<ConfigurationEntity> {
    return this._configurationsDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new ConfigurationEntity(_)) :
            throwError(new NotFoundException(`Configuration with id '${id}' not found`)),
        ),
      );
  }

  create(configuration: CreateConfigurationDto): Observable<ConfigurationEntity> {
    return this._addConfiguration(configuration)
      .pipe(
        flatMap(_ => this._configurationsDao.create(_)),
        catchError(e =>
          e.code = 11000 ?
            throwError(
              new ConflictException(`Configuration with name '${configuration.name}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new ConfigurationEntity(_)),
      );
  }

  update(id: string, configuration: UpdateConfigurationDto): Observable<ConfigurationEntity> {
    return this._configurationsDao.findByIdAndUpdate(id, configuration)
      .pipe(
        flatMap(_ =>
          !!_ ?
            of(new ConfigurationEntity((_))) :
            throwError(new NotFoundException(`Configuration with id '${id}' not found`)),
        ),
      );
  }

  delete(id: string): Observable<void> {
    return this._configurationsDao.findByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Configuration with id '${id}' not found`)),
        ),
      );
  }

  private _addConfiguration(configuration: CreateConfigurationDto): Observable<ConfigurationEntity> {
    return of(configuration)
      .pipe(
        map(_ =>
          Object.assign(_, {
            id: ConfigurationService._createId(),
          }),
        ),
      );
  }

  private static _createId(): string {
    return `${new Date().getTime()}`;
  }
}
