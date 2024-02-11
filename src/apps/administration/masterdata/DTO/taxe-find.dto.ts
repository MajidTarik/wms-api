import { IsOptional, IsString } from "class-validator";
export class TaxeFindDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  @IsOptional()
  readonly reftaxe: string;
}
