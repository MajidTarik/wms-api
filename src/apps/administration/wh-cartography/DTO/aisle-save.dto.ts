import {IsBoolean, IsNumber, IsOptional, IsString} from 'class-validator';
import {Typelocationposition} from "../../../../helpers/typelocationposition";
import {Typeseprator} from "../../../../helpers/typeseprator";
export class AisleSaveDto {
  @IsString()
  readonly refaisle: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refarea: string;

  @IsString()
  readonly aisle: string;

  @IsString()
  readonly reffurnituretype: string;

  @IsNumber()
  readonly xshelf: number;

  @IsString()
  readonly xtype: Typelocationposition;

  @IsNumber()
  readonly yfloor: number;

  @IsString()
  readonly ytype: Typelocationposition;

  @IsNumber()
  readonly zsection: number;

  @IsString()
  readonly ztype: Typelocationposition;

  @IsString()
  readonly prefix: string;

  @IsString()
  readonly separator: Typeseprator;

  @IsBoolean()
  readonly actif: boolean;

  @IsNumber()
  readonly heightseparator: number;

  @IsNumber()
  readonly widthseparator: number;
}
