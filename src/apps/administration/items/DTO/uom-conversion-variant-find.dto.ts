import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class UomConversionVariantFindDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  @IsOptional()
  readonly id: string;
}
