import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInstance, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { ComposantsDao } from '../../composant/dao/composants.dao';
import { Type } from 'class-transformer';
import { Composant } from '../../composant/interfaces/composant.interface';
import { UsersDao } from '../../user/dao/users.dao';
import { User } from '../../user/interfaces/user.interface';

export class UpdateConfigurationDto {
  @ApiModelPropertyOptional({ description: 'List of components'})
  @IsOptional()
  @IsInstance(ComposantsDao)
  @ValidateNested()
  @Type(() => ComposantsDao)
  @IsArray()
  @ArrayNotEmpty()
  readonly composants?: Composant[];

  @ApiModelPropertyOptional({ description: 'User' })
  @IsOptional()
  @IsInstance(UsersDao)
  @ValidateNested()
  @Type(() => UsersDao)
  @IsNotEmpty()
  readonly user?: User;
}
