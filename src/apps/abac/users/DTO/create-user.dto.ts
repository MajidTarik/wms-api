import {IsBoolean, IsEmail, IsInt, IsOptional, IsString, IsStrongPassword, MinLength} from "class-validator";
export class CreateUserDto {
  @IsString()
  readonly login: string;

  @IsString()
  @MinLength(3)
  readonly lastname: string;

  @IsString()
  @MinLength(3)
  readonly firstname: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsOptional()
  matricule: string;

  @IsBoolean()
  readonly actif: boolean;
}
