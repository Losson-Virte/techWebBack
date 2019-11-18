import {IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiModelPropertyOptional} from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiModelPropertyOptional({ description: 'Password', example: 'n3W_Pa$$w0rD' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly password?: string;

    @ApiModelPropertyOptional({ description: 'Email', example: 'firstname@webmail.com' })
    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    readonly mail?: string;
}
