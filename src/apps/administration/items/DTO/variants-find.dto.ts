import { IsOptional, IsString } from 'class-validator';
export class VariantsFindDto {
  @IsString()
  @IsOptional()
  readonly refitem: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  @IsOptional()
  readonly refvariant: string;
}
