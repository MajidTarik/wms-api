import {IsString} from "class-validator";

export class VariantConversionValidityDto {
    @IsString()
    readonly refcompany: string;

    @IsString()
    readonly refvariant: string;

    @IsString()
    readonly refunitfrom: string;

    @IsString()
    readonly refunitto: string;
}
