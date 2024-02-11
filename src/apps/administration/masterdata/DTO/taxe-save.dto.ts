import {IsNumber, IsOptional, IsString} from "class-validator";
export class TaxeSaveDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reftaxe: string;

  @IsString()
  readonly taxe: string;

  @IsString()
  readonly refcurrency: string;
}
