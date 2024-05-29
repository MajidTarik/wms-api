import { IsOptional, IsString } from "class-validator";
export class UserCompanyWarehouseFindDto {
  @IsString() readonly reforganisation: string;

  @IsString() readonly refcompany: string;

  @IsString() readonly matricule: string;

  @IsString() @IsOptional() readonly refwarehouse: string;
}
