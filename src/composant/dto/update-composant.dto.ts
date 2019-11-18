import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateComposantDto {
  @ApiModelPropertyOptional({ description: 'Component\'s type', example: 'GPU' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly type?: string;

  @ApiModelProperty({ description: 'Name', example: 'RTX 2080' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name?: string;

  @ApiModelProperty({ description: 'Price', example: '1080' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price?: string;
}
