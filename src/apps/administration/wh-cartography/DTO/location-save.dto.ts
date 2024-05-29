import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Abcclass } from "../../../../helpers/abcclass";
export class LocationSaveDto {
  @IsString()
  readonly refaisle: string;

  @IsString()
  readonly reflocation: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsBoolean()
  readonly actif: boolean;

  @IsNumber()
  readonly pickingpriority: number;

  @IsBoolean()
  readonly locked: boolean;

  @IsBoolean()
  readonly lockedforsale: boolean;

  @IsBoolean()
  readonly oneitem: boolean;

  @IsBoolean()
  readonly oneserial: boolean;

  @IsBoolean()
  readonly onebatch: boolean;

  @IsBoolean()
  readonly defaultforoneitem: boolean;

  @IsBoolean()
  readonly pickinglocation: boolean;

  @IsBoolean()
  readonly outofuse: boolean;

  @IsString()
  readonly abcclass: Abcclass;

  @IsNumber()
  readonly shelf: number;

  @IsNumber()
  readonly floor: number;

  @IsNumber()
  readonly section: number;
}
