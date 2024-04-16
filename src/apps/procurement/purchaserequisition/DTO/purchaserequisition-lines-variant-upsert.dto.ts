import {IsNumber, IsOptional, IsString} from "class-validator";
export class PurchaserequisitionLinesVariantUpsertDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refpurchaserequisition: string;

  @IsNumber()
  readonly id: number;

  @IsString()
  readonly refvariant: string;
}
