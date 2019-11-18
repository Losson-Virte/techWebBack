import {Exclude, Expose, Type} from "class-transformer";
import {ApiModelProperty} from "@nestjs/swagger";

@Exclude()
export class UserEntity {
    @ApiModelProperty({ description: 'Unique identifier in the database', example:"1573997603317"})
    @Expose()
    @Type(() => String)
    id: string;

    @ApiModelProperty({ description: 'Pseudonyme', example: 'RTXMaster54' })
    @Expose()
    @Type(() => String)
    pseudo: string;

    @ApiModelProperty({ description: 'Password', example: 'Pa$$w0rD' })
    @Type(() => String)
    password: string;

    @ApiModelProperty({ description: 'Email', example: 'pseudonyme@webmail.com' })
    @Expose()
    @Type(() => String)
    mail: string;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
