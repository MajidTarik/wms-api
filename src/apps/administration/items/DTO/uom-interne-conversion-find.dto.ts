import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
export class UomInterneConversionFindDto {
  @IsString()
  readonly refcompany: string;

  @IsOptional()
  @IsString()
  readonly refunitfrom: string;

  @IsOptional()
  @IsString()
  readonly refunitto: string;
}
