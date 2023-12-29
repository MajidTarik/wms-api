import { IsOptional, IsString } from "class-validator";
export class CurrencyFindDto {
  @IsString()
  @IsOptional()
  readonly refcurrency: string;
}
