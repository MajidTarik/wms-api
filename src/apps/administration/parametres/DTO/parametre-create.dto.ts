import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';
export class ParametreCreateDto {
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly refparametre: string;

  @IsString()
  @MinLength(3)
  @MaxLength(56)
  readonly parametre: string;

  @IsBoolean()
  readonly actif: boolean;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reftypeparametre: string;
}
