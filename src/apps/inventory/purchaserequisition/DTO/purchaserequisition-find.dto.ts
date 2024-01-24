import { IsOptional, IsString } from "class-validator";
export class PurchaserequisitionFindDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  @IsOptional()
  readonly refpurchaserequisition: string;
}
