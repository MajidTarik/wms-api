import { IsNumber, IsOptional, IsString } from "class-validator";
import { IsNull } from "typeorm";
export class ParametresFindDto {
  @IsString()
  @IsOptional()
  readonly refparametre: string;

  @IsString()
  @IsOptional()
  readonly parametre: string;

  @IsString()
  readonly refcompany: string;

  @IsNumber()
  @IsOptional()
  readonly idheaderparametre: number;

  @IsString()
  @IsOptional()
  readonly reftypeparametre: string;
}
