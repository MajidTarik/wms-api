import { IsOptional, IsString } from "class-validator";
export class VendorFindDto {
  @IsString()
  @IsOptional()
  readonly refvendor: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string
}
