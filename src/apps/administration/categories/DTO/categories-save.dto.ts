import { IsBoolean, IsOptional, IsString } from "class-validator";
export class CategoriesSaveDto {
  @IsString() readonly category: string;
  @IsString() readonly level: string;
  @IsString() readonly refcategories: string;
  @IsString() readonly refcategoriesgroup: string;
  @IsString() readonly refcompany: string;
  @IsString() readonly reforganisation: string;
  @IsString() @IsOptional() readonly refparentcategories: string;
  @IsString() @IsOptional() readonly refparentcategoriesgroup: string;
  @IsString() @IsOptional() readonly refparentcompany: string;
  @IsString() @IsOptional() readonly refparentorganisation: string;
  @IsBoolean() readonly actif: boolean;
}
