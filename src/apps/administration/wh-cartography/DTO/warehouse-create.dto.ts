import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class WarehouseCreateDto {
  @IsString()
  @MinLength(2)
  readonly refwarehouse: string;

  @IsString()
  @MinLength(2)
  @MaxLength(56)
  readonly warehouse: string;

  @IsBoolean()
  readonly actif: boolean;

  @IsString()
  refcompany: string;

  @IsString()
  reforganisation: string;

  @IsString()
  refsitegeographic: string;

  @IsObject()
  @IsOptional()
  parametres: object;

  @IsOptional()
  @IsNumber()
  idheaderparametre: number;
}
