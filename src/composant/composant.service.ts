import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Composant } from './interfaces/composant.interface';
import { COMPOSANT } from '../data/composant';
import { ComposantsDao } from './dao/composants.dao';
import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { ComposantEntity } from './entities/composant.entity';
import { CreateComposantDto } from './dto/create-composant.dto';
import { UpdateComposantDto } from './dto/update-composant.dto';

@Injectable()
export class ComposantService {
  private _composant: Composant[];

  constructor(private readonly _composantsDao: ComposantsDao) {
    this._composant = [].concat(COMPOSANT);
  }

  findAll(): Observable<ComposantEntity[] | void> {
    return this._composantsDao.find()
      .pipe(
        map(_ => !!_ ? _.map(__ => new ComposantEntity(__)) : undefined),
      );
  }

  findOne(id: string): Observable<ComposantEntity> {
    return this._composantsDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new ComposantEntity(_)) :
            throwError(new NotFoundException(`Component with id '${id}' not found`)),
        ),
      );
  }

  create(composant: CreateComposantDto): Observable<ComposantEntity> {
    return this._addComposant(composant)
      .pipe(
        flatMap(_ => this._composantsDao.create(_)),
        catchError(e =>
          e.code = 11000 ?
            throwError(
              new ConflictException(`Component with type '${composant.type}' and name '${composant.name}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new ComposantEntity(_)),
      );
  }

  update(id: string, composant: UpdateComposantDto): Observable<ComposantEntity> {
    return this._composantsDao.findByIdAndUpdate(id, composant)
      .pipe(
        catchError(e =>
          e.code = 11000 ?
            throwError(
              new ConflictException(`Component with type '${composant.type}' and name '${composant.name}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        flatMap(_ =>
          !!_ ?
            of(new ComposantEntity((_))) :
            throwError(new NotFoundException(`Component with id '${id}' not found`)),
        ),
      );
  }

  delete(id: string): Observable<void> {
    return this._composantsDao.findByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Component with id '${id}' not found`)),
        ),
      );
  }

  private _addComposant(composant: CreateComposantDto): Observable<ComposantEntity> {
    return of(composant)
      .pipe(
        map(_ =>
          Object.assign(_, {
            id: ComposantService._createId(),
          }),
        ),
      );
  }

  private static _createId(): string {
    return `${new Date().getTime()}`;
  }
}
