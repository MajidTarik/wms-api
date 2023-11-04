import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';
export class UomConversionVariantCreateDto {
  @IsString()
  readonly refvariant: string;

  @IsBoolean()
  readonly actif: boolean;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refunitfrom: string;

  @IsString()
  readonly refunitto: string;
}
