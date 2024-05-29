import { IsBoolean, IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
export class CompanyCreateDto {
  @IsString()
  @MinLength(3)
  readonly reforganisation: string;

  @IsString()
  @MinLength(3)
  @MaxLength(5)
  readonly refcompany: string;

  @IsString()
  @MinLength(3)
  @MaxLength(56)
  readonly company: string;

  @IsPhoneNumber()
  @IsOptional()
  readonly tel1: string;

  @IsPhoneNumber()
  @IsOptional()
  readonly tel2: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  readonly responsable1: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  readonly responsable2: string;

  @IsEmail()
  @IsOptional()
  readonly email1: string;

  @IsEmail()
  @IsOptional()
  readonly email2: string;

  @IsBoolean()
  readonly actif: boolean;
}
