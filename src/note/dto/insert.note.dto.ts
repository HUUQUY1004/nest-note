import { IsNotEmpty, IsOptional, IsString, isString } from "class-validator";

export class NoteDTO{
    @IsString()
    @IsNotEmpty()
    title : string

    @IsString()
    @IsOptional()
    description?: string

    @IsNotEmpty()
    @IsString()
    url : string

}