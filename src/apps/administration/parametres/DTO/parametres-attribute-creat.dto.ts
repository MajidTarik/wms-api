import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
export class ParametresAttributeCreatDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  readonly value: string;

  @IsBoolean()
  readonly actif: boolean;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  readonly refparametre: string;

  @IsBoolean()
  readonly isdefault: boolean;
}
