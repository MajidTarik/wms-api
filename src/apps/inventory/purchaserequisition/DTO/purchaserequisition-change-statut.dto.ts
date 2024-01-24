import { IsOptional, IsString } from "class-validator";
import {Purchaserequisitionstatuts} from "../../../../helpers/purchaserequisitionstatuts";
export class PurchaserequisitionChangeStatutDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refpurchaserequisition: string;

  @IsString()
  readonly refpurchaserequisitionstatuts: Purchaserequisitionstatuts;

  @IsString()
  readonly matricule: string;
}
