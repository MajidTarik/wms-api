import { IsOptional, IsString } from "class-validator";
export class TaxeGroupFindDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  @IsOptional()
  readonly reftaxegroup: string;
}
