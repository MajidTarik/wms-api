import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
export class VariantSaveDto {
  @IsString() readonly refitem: string;

  @IsString() readonly refvariant: string;

  @IsString() readonly refcompany: string;

  @IsBoolean() readonly stopedpurch: boolean;

  @IsBoolean() readonly stopedsales: boolean;

  @IsBoolean() readonly stopedinvent: boolean;

  @IsString() readonly barcode: string;

  @IsNumber() readonly safetystock: number;

  @IsString() readonly variantdescription: string;

  @IsString() readonly searchname: string;

  @IsNumber() readonly daystoexpiration: number;

  @IsString()
  @IsOptional()
  readonly reftaxesales: string;

  @IsString()
  @IsOptional()
  readonly reftaxepurchase: string;

  @IsNumber() @IsOptional() idheaderparametre: number;

  @IsObject() readonly parametres: object;

  @IsNumber() @IsOptional() idheadervariant: number;

  @IsObject() readonly variants: object;
}
