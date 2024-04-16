import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
export class VariantSaveDto {
  @IsString() readonly refitem: string;

  @IsString() @IsOptional() refvariant: string;

  @IsString() readonly refcompany: string;

  @IsBoolean() readonly stopedpurch: boolean;

  @IsBoolean() readonly stopedsales: boolean;

  @IsBoolean() readonly stopedinvent: boolean;

  @IsString() @IsOptional() readonly barcode: string;

  @IsNumber() @IsOptional() readonly safetystock: number;

  @IsString() @IsOptional() readonly variantdescription: string;

  @IsString() @IsOptional() readonly searchname: string;

  @IsNumber() idheadervariant: number;

  @IsObject() readonly variants: object;
}
