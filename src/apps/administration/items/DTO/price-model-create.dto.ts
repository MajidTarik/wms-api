import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';
export class PriceModelCreateDto {
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly refpricemodel: string;

  @IsString()
  @MinLength(3)
  @MaxLength(56)
  readonly pricemodel: string;

  @IsBoolean()
  readonly actif: boolean;

  @IsString()
  readonly refcompany: string;
}
