import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
export class CategoriesGroupSaveDto {
  @IsString() readonly refcategoriesgroup: string;

  @IsString() readonly refcompany: string;

  @IsString() readonly reforganisation: string;

  @IsString() readonly categoriesgroup: string;

  @IsBoolean() readonly actif: boolean;
}
