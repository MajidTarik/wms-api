import { IsString, MaxLength, MinLength } from 'class-validator';
export class ParametresShowDto {
  @IsString()
  readonly refparametre: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;
}
