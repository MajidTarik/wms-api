import { IsOptional, IsString } from 'class-validator';
export class UomConversionFindDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  @IsOptional()
  readonly refitem: string;

  @IsString()
  @IsOptional()
  readonly id: string;
}
