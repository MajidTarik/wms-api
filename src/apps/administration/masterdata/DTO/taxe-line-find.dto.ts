import { IsDate, IsOptional, IsString } from "class-validator";
export class TaxeLineFindDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reftaxe: string;

  @IsString()
  @IsOptional()
  readonly datedebut: string;
}
