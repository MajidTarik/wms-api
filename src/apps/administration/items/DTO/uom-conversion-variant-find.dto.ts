import { IsOptional, IsString } from 'class-validator';
export class UomConversionVariantFindDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  @IsOptional()
  readonly id: string;

  @IsString()
  @IsOptional()
  readonly refvariant: string;
}
