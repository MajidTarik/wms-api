import { IsString, MaxLength, MinLength } from 'class-validator';
export class PriceModelShowDto {
  @IsString()
  readonly refpricemodel: string;

  @IsString()
  readonly refcompany: string;
}
