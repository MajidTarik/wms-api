import { IsObject, IsOptional, IsString } from 'class-validator';
export class CategoriesGroupFindDto {
  @IsString() @IsOptional() readonly refcategoriesgroup: string;

  @IsString() readonly refcompany: string;

  @IsString() readonly reforganisation: string;

  @IsString() @IsOptional() readonly categoriesgroup: string;

  @IsObject() @IsOptional() readonly actif: boolean;
}
