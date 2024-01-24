import {IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString} from "class-validator";
import {Abcclass} from "../../../../helpers/abcclass";
import {
  PurchaserequisitionStatutsEntity
} from "../../../../entities/arazan-db/inventory/purchaserequisition-statuts.entity";
import {Purchaserequisitionstatuts} from "../../../../helpers/purchaserequisitionstatuts";
export class PurchaserequisitionSaveDto {
  @IsString()
  readonly refpurchaserequisition: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly requisitionobjectif: string;

  @IsString()
  @IsOptional()
  readonly details: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly preparator: string;

  @IsBoolean()
  readonly actif: boolean;

  /**
  @IsOptional()
  @IsNumber()
  idheaderparametre: number;

  @IsObject()
  readonly parametres: object;
  **/
}
