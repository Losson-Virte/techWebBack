import {Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors} from '@nestjs/common';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {UserInterceptor} from './interceptors/user.interceptor';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {HandlerParams} from './validators/handler-params';
import {UserEntity} from './entities/user.entity';
import {
    ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiImplicitBody, ApiImplicitParam,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnprocessableEntityResponse,
    ApiUseTags,
} from '@nestjs/swagger';

@ApiUseTags('User')
@Controller('user')
@UseInterceptors(UserInterceptor)
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @ApiOkResponse({description: 'Returns an array of dao', type: UserEntity, isArray: true})
    @ApiNoContentResponse({description: 'No dao exist in database'})
    @Get()
    findAll(): Observable<UserEntity[] | void> {
        return this._userService.findAll();
    }

    @ApiOkResponse({description: 'Returns the dao for the given "id"', type: UserEntity})
    @ApiNotFoundResponse({ description: 'User with the given "id" doesn\'t exist in the database' })
    @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
    @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
    @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the dao in the database', type: String })
    @Get(':id')
    findOne(@Param() params: HandlerParams): Observable<UserEntity> {
        return this._userService.findOne(params.id);
    }

    @ApiCreatedResponse({ description: 'The dao has been successfully created', type: UserEntity })
    @ApiConflictResponse({ description: 'The dao already exists in the database' })
    @ApiBadRequestResponse({ description: 'Payload provided is not good' })
    @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
    @ApiImplicitBody({ name: 'CreateUserDto', description: 'Payload to create a new dao', type: CreateUserDto })
    @Post()
    create(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
        return this._userService.create(createUserDto);
    }

    @ApiOkResponse({ description: 'The dao has been successfully updated', type: UserEntity })
    @ApiNotFoundResponse({ description: 'User with the given "id" doesn\'t exist in the database' })
    @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
    @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
    @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the dao in the database', type: String })
    @ApiImplicitBody({ name: 'UpdateUserDto', description: 'Payload to update a dao', type: UpdateUserDto })
    @Put(':id')
    update(@Param() params: HandlerParams, @Body() updateUserDto: UpdateUserDto): Observable<UserEntity> {
        return this._userService.update(params.id, updateUserDto);
    }

    @ApiNoContentResponse({ description: 'The dao has been successfully deleted' })
    @ApiNotFoundResponse({ description: 'User with the given "id" doesn\'t exist in the database' })
    @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
    @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
    @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the dao in the database', type: String })
    @Delete(':id')
    delete(@Param() params: HandlerParams): Observable<void> {
        return this._userService.delete(params.id);
    }
}
