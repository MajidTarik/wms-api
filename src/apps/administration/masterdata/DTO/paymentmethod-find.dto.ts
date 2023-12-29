import { IsOptional, IsString } from "class-validator";
export class PaymentmethodFindDto {
  @IsString()
  @IsOptional()
  readonly refpaymentmethod: string;

  @IsString()
  readonly refcompany: string;
}
