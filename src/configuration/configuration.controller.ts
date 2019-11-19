import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiImplicitBody, ApiImplicitParam,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { ConfigurationService } from './configuration.service';
import { Observable } from 'rxjs';
import { ConfigurationInterceptor } from './interceptors/configuration.interceptor';
import { ConfigurationEntity } from './entities/configuration.entity';
import { HandlerParams } from '../composant/validators/handler-params';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';

@ApiUseTags('Configuration')
@Controller('configuration')
@UseInterceptors(ClassSerializerInterceptor)
// TODO: Voir pourquoi l'interceptor empeche d'acceder au configuration
// @UseInterceptors(ConfigurationInterceptor)
export class ConfigurationController {
  constructor(private readonly _configurationService: ConfigurationService) {}

  @ApiOkResponse({description: 'Returns an array of dao', type: ConfigurationEntity, isArray: true})
  @ApiNoContentResponse({description: 'No dao exist in database'})
  @Get()
  findAll(): Observable<ConfigurationEntity[] | void> {
    return this._configurationService.findAll();
  }

  @ApiOkResponse({description: 'Returns the dao for the given "id"', type: ConfigurationEntity})
  @ApiNotFoundResponse({ description: 'Configuration with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the dao in the database', type: String })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<ConfigurationEntity> {
    return this._configurationService.findOne(params.id);
  }

  @ApiCreatedResponse({ description: 'The dao has been successfully created', type: ConfigurationEntity })
  @ApiConflictResponse({ description: 'The dao already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitBody({ name: 'CreateConfigurationDto', description: 'Payload to create a new dao', type: CreateConfigurationDto })
  @Post()
  create(@Body() createConfigurationDto: CreateConfigurationDto): Observable<ConfigurationEntity> {
    return this._configurationService.create(createConfigurationDto);
  }

  @ApiOkResponse({ description: 'The dao has been successfully updated', type: ConfigurationEntity })
  @ApiNotFoundResponse({ description: 'Configuration with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the dao in the database', type: String })
  @ApiImplicitBody({ name: 'UpdateConfigurationDto', description: 'Payload to update a dao', type: UpdateConfigurationDto })
  @Put(':id')
  update(@Param() params: HandlerParams, @Body() updateConfigurationDto: UpdateConfigurationDto): Observable<ConfigurationEntity> {
    return this._configurationService.update(params.id, updateConfigurationDto);
  }

  @ApiNoContentResponse({ description: 'The dao has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Configuration with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the dao in the database', type: String })
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._configurationService.delete(params.id);
  }
}
