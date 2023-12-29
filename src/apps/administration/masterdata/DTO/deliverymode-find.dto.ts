import { IsOptional, IsString } from "class-validator";
export class DeliverymodeFindDto {
  @IsString()
  @IsOptional()
  readonly refdeliverymode: string;

  @IsString()
  readonly refcompany: string;
}
