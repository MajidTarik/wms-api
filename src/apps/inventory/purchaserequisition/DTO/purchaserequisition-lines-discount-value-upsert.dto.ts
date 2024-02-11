import {IsNumber, IsOptional, IsString} from "class-validator";
export class PurchaserequisitionLinesDiscountValueUpsertDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refpurchaserequisition: string;

  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly discountvalue: number;
}
