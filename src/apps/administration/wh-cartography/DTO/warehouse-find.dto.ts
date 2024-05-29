import { IsOptional, IsString } from 'class-validator';
export class WarehouseFindDto {
  @IsString()
  @IsOptional()
  readonly refwarehouse: string;

  @IsString()
  @IsOptional()
  readonly warehouse: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  @IsOptional()
  readonly refsitegeographic: string;
}
