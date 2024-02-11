import { IsOptional, IsString } from "class-validator";
export class PurchaseorderFindDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  @IsOptional()
  readonly refpurchaserequisition: string;

  @IsString()
  @IsOptional()
  readonly refpurchaseorder: string;
}
