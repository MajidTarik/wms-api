import {IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString} from "class-validator";
import {Abcclass} from "../../../../helpers/abcclass";
export class VendorSaveDto {
  @IsString()
  readonly refvendor: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refvendortype: string;

  @IsString()
  readonly prenom: string;

  @IsString()
  readonly nom: string;

  @IsString()
  readonly refvendorgroup: string;

  @IsString()
  readonly ice: string;

  @IsString()
  readonly if: string;

  @IsString()
  readonly rc: string;

  @IsString()
  readonly patente: string;

  @IsString()
  readonly cnss: string;

  @IsString()
  readonly ncin: string;

  @IsString()
  readonly adresse: string;

  @IsString()
  readonly contactdescription: string;

  @IsString()
  readonly contactmail: string;

  @IsString()
  readonly contacttelephone: string;

  @IsString()
  readonly refcurrency: string;

  @IsString()
  @IsOptional()
  readonly refvendorinvoicing: string;

  @IsString()
  @IsOptional()
  readonly refdeliverymode: string;

  @IsString()
  @IsOptional()
  readonly refpaymentcondition: string;

  @IsString()
  @IsOptional()
  readonly refpaymentmethod: string;

  @IsBoolean()
  readonly bloqued: boolean;

  @IsString()
  readonly reflanguage: string;

  @IsOptional()
  @IsNumber()
  idheaderparametre: number;

  @IsObject()
  readonly parametres: object;
}
