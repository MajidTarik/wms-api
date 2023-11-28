import {IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString} from "class-validator";
export class ItemsSaveDto {
  @IsString() readonly refitem: string;

  @IsString() readonly refcompany: string;

  @IsString() readonly item: string;

  @IsBoolean() readonly stopedpurch: boolean;

  @IsBoolean() readonly stopedsales: boolean;

  @IsBoolean() readonly stopedinvent: boolean;

  @IsString() readonly barcode: string;

  @IsNumber() readonly safetystock: number;

  @IsString() readonly refunitinvent: string;

  @IsString() readonly refunitsales: string;

  @IsString() readonly refunitpurch: string;

  @IsString() readonly refunitorder: string;

  @IsString() readonly itemdescription: string;

  @IsString() readonly searchname: string;

  @IsNumber() readonly expirationdate: number;

  @IsString() readonly refpricemodel: string;

  @IsNumber() @IsOptional() idheaderparametre: number;

  @IsObject() readonly parametres: object;
  @IsArray() readonly categories: [];
}
