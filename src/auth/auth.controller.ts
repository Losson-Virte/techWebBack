import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiUseTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entities/user.entity';
import { HandlerParams } from './validators/handler-params';

@ApiUseTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  // TODO: A réactiver lors de la correction de validateUser
  /*
  @ApiCreatedResponse({ description: 'The dao has been successfully created', type: UserEntity })
  @ApiConflictResponse({ description: 'The dao already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @Get(':username/:password')
  create(@Param() params: HandlerParams): Observable<UserEntity> {
    return this._authService.validateUser(params.username, params.password);
  }
   */
}
