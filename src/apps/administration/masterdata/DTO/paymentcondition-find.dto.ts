import { IsOptional, IsString } from "class-validator";
export class PaymentconditionFindDto {
  @IsString()
  @IsOptional()
  readonly refpaymentcondition: string;

  @IsString()
  readonly refcompany: string;
}
