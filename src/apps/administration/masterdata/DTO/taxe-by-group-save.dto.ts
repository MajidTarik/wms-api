import {IsArray, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

class Taxes {
    @IsString()
    readonly reftaxe: string;

    @IsString()
    readonly refcompany: string;

    @IsString()
    readonly reforganisation: string;

    @IsString()
    readonly reftaxegroup: string
}

export class TaxeByGroupSaveDto {
    @IsString()
    readonly refcompany: string;

    @IsString()
    readonly reforganisation: string;

    @IsString()
    readonly reftaxegroup: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Taxes)
    affectedtaxes: Taxes[];
}
