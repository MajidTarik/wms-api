import {IsBoolean, IsDate, IsNumber, IsOptional, IsString} from 'class-validator';
import { DateRangeTaxeValidation } from '../../../../helpers/validators/is-date-range-taxe-valid.validator';
export class TaxeLineSaveDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  readonly reftaxe: string;

  @IsString()
  readonly datedebut: string;

  @IsString()
  @DateRangeTaxeValidation({ message: 'Date debut doit être inférieur à loa date fin' })
  readonly datefin: string;

  @IsNumber()
  readonly percentage: number;
}
