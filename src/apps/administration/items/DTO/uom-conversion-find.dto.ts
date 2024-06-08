import { IsOptional, IsString } from 'class-validator';
export class UomConversionFindDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  @IsOptional()
  readonly refitem: string;

  @IsString()
  @IsOptional()
  readonly refunitfrom: string;

  @IsString()
  @IsOptional()
  readonly refunitto: string;
}
