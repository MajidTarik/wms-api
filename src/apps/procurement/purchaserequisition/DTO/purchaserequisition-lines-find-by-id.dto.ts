import {IsNumber, IsOptional, IsString} from "class-validator";
export class PurchaserequisitionLinesFindByIdDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refpurchaserequisition: string;

  @IsNumber()
  readonly id: number;
}
