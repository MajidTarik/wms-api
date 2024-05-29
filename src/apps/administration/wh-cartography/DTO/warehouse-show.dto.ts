import { IsString, MaxLength, MinLength } from 'class-validator';
export class WarehouseShowDto {
  @IsString()
  @MinLength(2)
  readonly refwarehouse: string;

  @IsString()
  @MinLength(2)
  readonly refcompany: string;

  @IsString()
  @MinLength(2)
  readonly reforganisation: string;
}
