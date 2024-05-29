import { IsBoolean, IsEmail, IsInt, IsString, IsStrongPassword, MinLength } from "class-validator";
export class AuthentificationDataDto {
  @IsString()
  @MinLength(4)
  readonly pseudo: string;

  @IsStrongPassword()
  readonly pwd: string;

  @IsString()
  readonly organisation: string;
}
