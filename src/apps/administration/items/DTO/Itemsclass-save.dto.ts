import {IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString} from "class-validator";
import {Abcclass} from "../../../../helpers/abcclass";
export class ItemsclassSaveDto {
  @IsString() readonly refitem: string;

  @IsString() readonly refcompany: string;

  @IsString()
  @IsOptional()
  readonly refvariant: string;

  @IsString() readonly refwarehouse: string;

  @IsString() readonly class: Abcclass;

  @IsBoolean() readonly actif: boolean;
}
