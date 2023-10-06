import { IsNumber, IsOptional, IsString } from "class-validator";
export class UnitFindDto {
  @IsString()
  @IsOptional()
  readonly refunit: string;

  @IsString()
  @IsOptional()
  readonly unit: string;

  @IsString()
  readonly refcompany: string;
}
