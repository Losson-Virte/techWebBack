import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

@Exclude()
export class ComposantEntity {
  @ApiModelProperty({ description: 'Unique identifier in the database', example: '1573997603317' })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiModelProperty({ description: 'Component\'s type', example: 'GPU' })
  @Expose()
  @Type(() => String)
  type: string;

  @ApiModelProperty({ description: 'Name', example: 'RTX 2080' })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiModelProperty({ description: 'Price', example: '2080' })
  @Expose()
  @Type(() => Number)
  price: number;

  constructor(partial: Partial<ComposantEntity>) {
    Object.assign(this, partial);
  }
}
