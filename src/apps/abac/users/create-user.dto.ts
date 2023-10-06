import { IsBoolean, IsEmail, IsInt, IsString, IsStrongPassword, MinLength } from "class-validator";
export class CreateUserDto {
  @IsString()
  @MinLength(4)
  readonly login: string;

  @IsStrongPassword()
  readonly pwd: string;

  @IsString()
  readonly pwdConfirmation: string;

  @IsInt()
  readonly matriculeCreated: number;

  @IsInt()
  readonly matriculeLastUpdate: number;

  @IsString()
  @MinLength(3)
  readonly lastname: string;

  @IsString()
  @MinLength(3)
  readonly firstname: string;

  @IsEmail()
  readonly email: string;

  @IsInt()
  readonly matricule: string;

  @IsBoolean()
  readonly actif: boolean;
}
