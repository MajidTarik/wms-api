import { IsBoolean, IsEmail, IsInt, IsString, IsStrongPassword, MinLength } from "class-validator";
export class SetDefaultCompanyDto {
  @IsString()
  readonly idUser: number;

  @IsString()
  readonly refcompany: string;
}
