import {IsString} from "class-validator";

export class ItemConversionValidityDto {
    @IsString()
    readonly refcompany: string;

    @IsString()
    readonly refitem: string;

    @IsString()
    readonly refunitfrom: string;

    @IsString()
    readonly refunitto: string;
}
