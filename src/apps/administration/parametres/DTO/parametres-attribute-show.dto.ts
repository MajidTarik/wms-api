import { IsString, MaxLength, MinLength } from 'class-validator';
export class ParametresAttributeShowDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly refparametre: string;

  @IsString()
  readonly value: string;
}
