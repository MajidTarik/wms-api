import {IsBoolean, IsOptional} from "class-validator";
export class ControlobjectFindDto {

  @IsBoolean()
  @IsOptional()
  readonly okforgroupcategories: boolean;

  @IsBoolean()
  @IsOptional()
  readonly okforworkflows: boolean;

  @IsBoolean()
  @IsOptional()
  readonly okforaddress: boolean;

  @IsBoolean()
  @IsOptional()
  readonly refcontrolobject: string;

  @IsBoolean()
  @IsOptional()
  readonly prefix: string;
}
