import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';
export class UnitCreateDto {
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly refunit: string;

  @IsString()
  @MinLength(3)
  @MaxLength(56)
  readonly unit: string;

  @IsBoolean()
  readonly actif: boolean;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;
}
