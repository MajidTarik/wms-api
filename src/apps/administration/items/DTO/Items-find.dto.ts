import { IsOptional, IsString } from 'class-validator';
export class ItemsFindDto {
  @IsString()
  @IsOptional()
  readonly refitem: string;

  @IsString()
  @IsOptional()
  readonly item: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  @IsOptional()
  readonly searchname: string;

  @IsString()
  @IsOptional()
  readonly barcode: string;

  @IsString()
  @IsOptional()
  readonly itemdescription: string;
}
