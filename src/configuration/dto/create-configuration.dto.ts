import { ApiModelProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInstance, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Composant } from '../../composant/interfaces/composant.interface';
import { ComposantsDao } from '../../composant/dao/composants.dao';
import { Type } from 'class-transformer';
import { User } from '../../user/interfaces/user.interface';
import { UsersDao } from '../../user/dao/users.dao';

export class CreateConfigurationDto {
  @ApiModelProperty({ description: 'Name', example: 'Configuration gamer lowcost' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({ description: 'List of components'})
  @IsInstance(ComposantsDao)
  @ValidateNested()
  @Type(() => ComposantsDao)
  @IsArray()
  @ArrayNotEmpty()
  readonly composants: Composant[];

  @ApiModelProperty({ description: 'User' })
  @IsInstance(UsersDao)
  @ValidateNested()
  @Type(() => UsersDao)
  @IsNotEmpty()
  readonly user: User;
}
