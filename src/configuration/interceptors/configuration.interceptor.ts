import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { merge, Observable, of } from 'rxjs';
import { FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import { filter, flatMap, map, tap } from 'rxjs/operators';

export class ConfigurationInterceptor implements NestInterceptor {
  constructor(private readonly _logger: Logger) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const cls = context.getClass();
    const handler = context.getHandler();
    const response: FastifyReply<ServerResponse> = context.switchToHttp().getResponse<FastifyReply<ServerResponse>>();
    const logCtx: string = `ConfigurationInterceptor => ${cls.name}.${handler.name}`;

    return next.handle()
      .pipe(
        map(_ => of(_)),
        flatMap((obs: Observable<any>) =>
          merge(
            obs
              .pipe(
                filter(_ => !!_),
                map(_ => _),
              ),
            obs
              .pipe(
                filter(_ => !_),
                tap(_ => response.status(204)),
                map(_ => _),
              ),
          )),
        tap(
          _ => this._logger.log(!!_ ? _ : 'NO CONTENT', logCtx),
          _ => this._logger.error(_.message, JSON.stringify(_), logCtx),
        ),
      );
  }
}
