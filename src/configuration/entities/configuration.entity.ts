import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { Composant } from '../../composant/interfaces/composant.interface';
import { User } from '../../user/interfaces/user.interface';
import { UserEntity } from '../../user/entities/user.entity';
import { ComposantEntity } from '../../composant/entities/composant.entity';

@Exclude()
export class ConfigurationEntity {
  @ApiModelProperty({ description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiModelProperty({ description: 'Name', example: 'Configuration gamer lowcost' })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiModelProperty({ description: 'List of components'})
  @Expose()
  @Type(() => ComposantEntity)
  composants: Composant[];

  @ApiModelProperty({ description: 'User' })
  @Expose()
  @Type(() => UserEntity)
  user: User;

  constructor(partial: Partial<ComposantEntity>) {
    Object.assign(this, partial);
  }
}
