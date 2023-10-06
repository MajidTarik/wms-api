import { IsBoolean, IsDecimal, IsNumber, IsString } from "class-validator";
export class UomInterneConversionCreateDto {
  @IsBoolean()
  readonly actif: boolean;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refunitfrom: string;

  @IsString()
  readonly refunitto: string;

  @IsNumber()
  readonly coefficient: number;
}
