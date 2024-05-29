import { IsString } from "class-validator";
export class CategoriesAffectationDto {
  @IsString() readonly refObject: string;
  @IsString() readonly refcompany: string;
  @IsString() readonly prefix: string;
}
