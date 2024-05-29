import { IsBoolean, IsString } from "class-validator";
export class UserCompanyWarehouseSaveDto {
  @IsString() readonly reforganisation: string;

  @IsString() readonly refcompany: string;

  @IsString() readonly matricule: string;

  @IsBoolean() readonly actif: boolean;

  @IsString() readonly refwarehouse: string;

  @IsBoolean() readonly canrequestpurchase: boolean;

  @IsBoolean() readonly canreceipt: boolean;


}
