import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
export class ItemsSaveDto {
  @IsString()
  @IsOptional()
  readonly refitem: string;

  @IsString() readonly refcompany: string;

  @IsNumber()
  @IsOptional()
  readonly alerttime: number;

  @IsNumber()
  @IsOptional()
  readonly bestbeforetime: number;

  @IsNumber()
  @IsOptional()
  readonly purchaseprice: number;

  @IsNumber()
  @IsOptional()
  readonly purchasepriceunit: number;

  @IsString()
  @IsOptional()
  readonly refitemtracking: string;

  @IsNumber()
  @IsOptional()
  readonly removaltime: number;

  @IsNumber()
  @IsOptional()
  readonly salesprice: number;

  @IsNumber()
  @IsOptional()
  readonly salespriceunit: number;

  @IsString() readonly reforganisation: string;

  @IsOptional()
  @IsString()
  readonly item: string;

  @IsBoolean()
  @IsOptional()
  readonly stopedpurch: boolean;

  @IsBoolean()
  @IsOptional()
  readonly stopedsales: boolean;

  @IsBoolean()
  @IsOptional()
  readonly stopedinvent: boolean;

  @IsString()
  @IsOptional()
  readonly barcode: string;

  @IsNumber()
  @IsOptional()
  readonly safetystock: number;

  @IsString()
  @IsOptional()
  readonly refunitinvent: string;

  @IsString()
  @IsOptional()
  readonly refunitsales: string;

  @IsString()
  @IsOptional()
  readonly refunitpurch: string;

  @IsString()
  @IsOptional()
  readonly refunitorder: string;

  @IsString()
  @IsOptional()
  readonly itemdescription: string;

  @IsString()
  @IsOptional()
  readonly searchname: string;

  @IsNumber()
  @IsOptional()
  readonly expirationdate: number;

  @IsString()
  @IsOptional()
  readonly refpricemodel: string;

  @IsString()
  @IsOptional()
  readonly refitemgroup: string;

  @IsString()
  @IsOptional()
  readonly reftaxesales: string;

  @IsString()
  @IsOptional()
  readonly reftaxepurchase: string;

  @IsNumber()
  @IsOptional()
  idheaderparametre: number;

  @IsObject()
  @IsOptional()
  readonly parametres: object;

  @IsArray()
  @IsOptional()
  readonly categories: [];
}
