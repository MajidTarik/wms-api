import { IsString, MaxLength, MinLength } from 'class-validator';
export class UomConversionFindDto {
  @IsString()
  readonly refcompany: string;
}
