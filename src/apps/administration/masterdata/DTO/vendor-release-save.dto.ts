import { IsString } from "class-validator";
export class VendorReleaseSaveDto {
  @IsString()
  readonly reforganisation: string;

  @IsString()
  readonly refvendor: string;

  @IsString()
  readonly refcompany: string;
}
