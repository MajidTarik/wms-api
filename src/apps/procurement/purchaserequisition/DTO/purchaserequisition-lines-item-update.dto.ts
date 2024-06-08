import {IsNumber, IsOptional, IsString} from "class-validator";
export class PurchaserequisitionLinesItemUpdateDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  readonly refpurchaserequisition: string;

  @IsString()
  readonly refitem: string;

  @IsNumber()
  readonly id: number;
}
