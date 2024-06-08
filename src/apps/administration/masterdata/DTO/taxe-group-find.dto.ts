import { IsOptional, IsString } from "class-validator";
export class TaxeGroupFindDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  @IsOptional()
  readonly reftaxegroup: string;
}
