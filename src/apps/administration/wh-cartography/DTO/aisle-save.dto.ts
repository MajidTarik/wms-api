import {IsBoolean, IsNumber, IsOptional, IsString} from 'class-validator';
import {Typelocationposition} from "../../../../helpers/typelocationposition";
import {Typeseprator} from "../../../../helpers/typeseprator";
export class AisleSaveDto {
  @IsString()
  @IsOptional()
  readonly refaisle: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  readonly refarea: string;

  @IsString()
  readonly aisle: string;

  @IsString()
  readonly reffurnituretype: string;

  @IsNumber()
  readonly xshelf: number;

  @IsNumber()
  readonly yfloor: number;

  @IsNumber()
  readonly zsection: number;

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
