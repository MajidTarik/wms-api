import {IsNumber, IsString} from "class-validator";
export class PurchaserequisitionLinesDeleteDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refpurchaserequisition: string;

  @IsNumber()
  readonly id: number;
}
