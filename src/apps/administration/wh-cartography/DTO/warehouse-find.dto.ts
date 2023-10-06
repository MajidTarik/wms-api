import { IsOptional, IsString } from 'class-validator';
export class WarehouseFindDto {
  @IsString()
  @IsOptional()
  readonly refwarehouse: string;

  @IsString()
  @IsOptional()
  readonly warehouse: string;

  @IsString()
  @IsOptional()
  readonly refcompany: string;
}
