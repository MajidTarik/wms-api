import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
export class UserCompanyFindDto {
  @IsString() readonly reforganisation: string;

  @IsString() @IsOptional() readonly refcompany: string;

  @IsString() readonly matricule: string;
}
