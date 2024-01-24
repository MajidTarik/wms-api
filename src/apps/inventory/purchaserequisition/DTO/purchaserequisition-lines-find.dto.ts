import {IsNumber, IsOptional, IsString} from "class-validator";
export class PurchaserequisitionLinesFindDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refpurchaserequisition: string;

  @IsNumber()
  @IsOptional()
  readonly id: number;

  @IsString()
  @IsOptional()
  readonly refvendor: string;
}
