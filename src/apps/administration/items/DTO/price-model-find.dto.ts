import { IsNumber, IsOptional, IsString } from "class-validator";
export class PriceModelFindDto {
  @IsString()
  @IsOptional()
  readonly refpricemodel: string;

  @IsString()
  @IsOptional()
  readonly pricemodel: string;

  @IsString()
  @IsOptional()
  readonly refcompany: string;
}
