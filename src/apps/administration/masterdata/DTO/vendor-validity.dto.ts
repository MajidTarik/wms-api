import { IsOptional, IsString } from "class-validator";
export class VendorValidityDto {
  @IsString()
  readonly refvendor: string;

  @IsString()
  readonly refcompany: string;
}
