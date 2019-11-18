import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiModelProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiModelProperty({ description: 'Pseudonyme', example: 'RTXMaster54' })
    @IsString()
    @IsNotEmpty()
    readonly pseudo: string;

    @ApiModelProperty({ description: 'Password', example: 'Pa$$w0rD' })
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @ApiModelProperty({ description: 'Email', example: 'pseudonyme@webmail.com' })
    @IsEmail()
    @IsNotEmpty()
    readonly mail: string;
}
