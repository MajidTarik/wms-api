import { IsOptional, IsString } from "class-validator";
export class VendorgroupFindDto {
  @IsString()
  @IsOptional()
  readonly refvendorgroup: string;

  @IsString()
  readonly refcompany: string;
}
