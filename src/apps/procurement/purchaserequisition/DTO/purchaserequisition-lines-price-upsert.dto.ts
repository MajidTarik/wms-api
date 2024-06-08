import {IsNumber, IsOptional, IsString} from "class-validator";
export class PurchaserequisitionLinesPriceUpsertDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  readonly refpurchaserequisition: string;

  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly price: number;
}
