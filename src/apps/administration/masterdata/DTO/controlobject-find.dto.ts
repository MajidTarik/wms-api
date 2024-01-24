import {IsBoolean, IsOptional} from "class-validator";
export class ControlobjectFindDto {

  @IsBoolean()
  @IsOptional()
  readonly okforgroupcategories: boolean;

  @IsBoolean()
  @IsOptional()
  readonly okforworkflows: boolean;
}
