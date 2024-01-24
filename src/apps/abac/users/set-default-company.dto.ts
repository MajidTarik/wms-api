import { IsBoolean, IsEmail, IsInt, IsString, IsStrongPassword, MinLength } from "class-validator";
export class SetDefaultCompanyDto {
  @IsString()
  readonly matricule: string;

  @IsString()
  readonly refcompany: string;
}
