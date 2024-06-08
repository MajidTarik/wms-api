import {IsArray, IsOptional, IsString, ValidateNested} from 'class-validator';
import {Type} from "class-transformer";

class AffectedTaxe {
  @IsString()
  readonly reftaxe: string;
}

export class TaxeGroupSaveDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  readonly reftaxegroup: string;

  @IsString()
  readonly taxegroup: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AffectedTaxe)
  readonly affectedtaxes: AffectedTaxe[];
}
