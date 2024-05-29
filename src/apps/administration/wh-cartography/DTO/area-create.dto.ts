import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class AreaCreateDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  readonly refarea: string;

  @IsString()
  @MinLength(2)
  @MaxLength(56)
  readonly area: string;

  @IsBoolean()
  readonly actif: boolean;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  readonly refwarehouse: string;
}
