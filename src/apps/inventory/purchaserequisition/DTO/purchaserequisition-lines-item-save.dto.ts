import {IsNumber, IsOptional, IsString} from "class-validator";
export class PurchaserequisitionLinesItemSaveDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refpurchaserequisition: string;

  @IsString()
  readonly refitem: string;
}
