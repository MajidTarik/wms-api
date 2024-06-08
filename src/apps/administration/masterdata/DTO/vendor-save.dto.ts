import {IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString} from "class-validator";
import {Abcclass} from "../../../../helpers/abcclass";
export class VendorSaveDto {
  @IsString()
  @IsOptional()
  readonly refvendor: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refvendortype: string;

  @IsString()
  @IsOptional()
  readonly prenom: string;

  @IsString()
  readonly nom: string;

  @IsString()
  @IsOptional()
  readonly refvendorgroup: string;

  @IsString()
  @IsOptional()
  readonly ice: string;

  @IsString()
  @IsOptional()
  readonly if: string;

  @IsString()
  @IsOptional()
  readonly rc: string;

  @IsString()
  @IsOptional()
  readonly patente: string;

  @IsString()
  @IsOptional()
  readonly cnss: string;

  @IsString()
  @IsOptional()
  readonly ncin: string;

  @IsString()
  @IsOptional()
  readonly contactdescription: string;

  @IsString()
  @IsOptional()
  readonly contactmail: string;

  @IsString()
  @IsOptional()
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

  @IsString()
  @IsOptional()
  readonly reftaxegroup: string;

  @IsOptional()
  @IsNumber()
  idheaderparametre: number;

  @IsObject()
  @IsOptional()
  readonly parametres: object;
}
