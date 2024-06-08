import {IsBoolean, IsNumber, IsString, MaxLength, MinLength} from 'class-validator';
export class UomConversionCreateDto {
  @IsString()
  readonly refitem: string;

  @IsBoolean()
  readonly actif: boolean;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  readonly refunitfrom: string;

  @IsString()
  readonly refunitto: string;

  @IsNumber()
  readonly coefficient: number;
}
