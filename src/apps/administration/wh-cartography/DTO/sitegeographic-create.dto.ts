import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SitegeographicCreateDto {
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly refsitegeographic: string;

  @IsString()
  @MinLength(2)
  @MaxLength(56)
  readonly sitegeographic: string;

  @IsBoolean()
  readonly actif: boolean;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsObject()
  @IsOptional()
  readonly parametres: object;

  @IsOptional()
  @IsNumber()
  idheaderparametre: number;

  @IsString()
  @IsOptional()
  readonly description: string;
}
