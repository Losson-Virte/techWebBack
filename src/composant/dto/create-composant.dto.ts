import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateComposantDto {
  @ApiModelProperty({ description: 'Component\'s type', example: 'GPU' })
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiModelProperty({ description: 'Name', example: 'RTX 2080' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({ description: 'Price', example: '1080' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;
}
