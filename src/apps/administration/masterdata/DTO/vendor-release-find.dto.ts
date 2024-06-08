import {IsBoolean, IsOptional, IsString} from "class-validator";
export class VendorReleaseFindDto {
  @IsString()
  readonly reforganisation: string;

  @IsString()
  readonly refvendor: string;

  @IsString()
  @IsOptional()
  readonly refcompany: string;
}
