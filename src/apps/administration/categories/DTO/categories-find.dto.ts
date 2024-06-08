import { IsOptional, IsString } from "class-validator";
export class CategoriesFindDto {
  @IsString() readonly refcategoriesgroup: string;

  @IsString() readonly refcompany: string;
  @IsString() readonly reforganisation: string;

  @IsString() @IsOptional() readonly refcategories: string;
}
