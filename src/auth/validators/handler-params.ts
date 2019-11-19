import { IsNotEmpty, IsString } from 'class-validator';

export class HandlerParams {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
