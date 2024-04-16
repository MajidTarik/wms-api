import {IsNumber, IsOptional, IsString} from "class-validator";
export class PurchaserequisitionLinesQtyUpsertDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refpurchaserequisition: string;

  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly quantity: number;
}
