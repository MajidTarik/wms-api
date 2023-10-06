import { IsString, MaxLength, MinLength } from 'class-validator';
export class WarehouseShowDto {
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly refwarehouse: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly refcompany: string;
}
