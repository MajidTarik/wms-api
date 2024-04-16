import {IsString} from "class-validator";

export class ClassicConversionValidityDto {
    @IsString()
    readonly refcompany: string;

    @IsString()
    readonly refunitfrom: string;

    @IsString()
    readonly refunitto: string;
}
