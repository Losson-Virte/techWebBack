import {IsMongoId, IsNotEmpty, IsString} from "class-validator";

export class HandlerParams {
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}
