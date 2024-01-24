import { IsOptional, IsString } from "class-validator";
export class CategoriesAffectationDto {
  @IsString() readonly entity: string;

  @IsString() readonly refcompany: string;

  @IsString() readonly refentity: string;

  @IsString() readonly refcontrolobject: string;
}
