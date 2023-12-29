import { IsOptional, IsString } from "class-validator";
export class VendortypeFindDto {
  @IsString()
  @IsOptional()
  readonly refvendortype: string;
}
