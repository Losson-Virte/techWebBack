import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiImplicitBody,
  ApiImplicitParam,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse, ApiUseTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ComposantService } from './composant.service';
import { ComposantEntity } from './entities/composant.entity';
import { HandlerParams } from './validators/handler-params';
import { UpdateComposantDto } from './dto/update-composant.dto';
import { CreateComposantDto } from './dto/create-composant.dto';
import { ComposantInterceptor } from './interceptors/composant.interceptor';

@ApiUseTags('Composant')
@Controller('composant')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ComposantInterceptor)
export class ComposantController {
  constructor(private readonly _composantService: ComposantService) {}

  @ApiOkResponse({description: 'Returns an array of dao', type: ComposantEntity, isArray: true})
  @ApiNoContentResponse({description: 'No dao exist in database'})
  @Get()
  findAll(): Observable<ComposantEntity[] | void> {
    return this._composantService.findAll();
  }

  @ApiOkResponse({description: 'Returns the dao for the given "id"', type: ComposantEntity})
  @ApiNotFoundResponse({ description: 'Component with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the dao in the database', type: String })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<ComposantEntity> {
    return this._composantService.findOne(params.id);
  }

  @ApiCreatedResponse({ description: 'The dao has been successfully created', type: ComposantEntity })
  @ApiConflictResponse({ description: 'The dao already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitBody({ name: 'CreateComposantDto', description: 'Payload to create a new dao', type: CreateComposantDto })
  @Post()
  create(@Body() createComposantDto: CreateComposantDto): Observable<ComposantEntity> {
    return this._composantService.create(createComposantDto);
  }

  @ApiOkResponse({ description: 'The dao has been successfully updated', type: ComposantEntity })
  @ApiNotFoundResponse({ description: 'Component with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the dao in the database', type: String })
  @ApiImplicitBody({ name: 'UpdateComposantDto', description: 'Payload to update a dao', type: UpdateComposantDto })
  @Put(':id')
  update(@Param() params: HandlerParams, @Body() updateComposantDto: UpdateComposantDto): Observable<ComposantEntity> {
    return this._composantService.update(params.id, updateComposantDto);
  }

  @ApiNoContentResponse({ description: 'The dao has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Component with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the dao in the database', type: String })
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._composantService.delete(params.id);
  }
}
