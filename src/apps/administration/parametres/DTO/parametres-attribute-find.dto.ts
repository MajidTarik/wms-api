import { IsOptional, IsString } from 'class-validator';
export class ParametresAttributeFindDto {
  @IsString()
  readonly refparametre: string;

  @IsString()
  @IsOptional()
  readonly value: string;

  @IsString()
  readonly refcompany: string;
}
