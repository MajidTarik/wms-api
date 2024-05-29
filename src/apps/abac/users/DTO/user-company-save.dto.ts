import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
export class UserCompanySaveDto {
  @IsString() readonly reforganisation: string;

  @IsString() readonly refcompany: string;

  @IsString() readonly matricule: string;

  @IsBoolean() readonly actif: boolean;

  @IsBoolean() readonly defaultrefcompany: boolean;
}
