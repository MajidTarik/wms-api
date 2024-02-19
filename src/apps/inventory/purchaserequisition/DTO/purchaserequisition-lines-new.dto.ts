import {IsNumber, IsOptional, IsString} from "class-validator";
export class PurchaserequisitionLinesNewDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refpurchaserequisition: string;
}
