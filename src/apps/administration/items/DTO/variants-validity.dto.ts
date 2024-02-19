import { IsString } from 'class-validator';
export class VariantsValidityDto {
  @IsString()
  readonly refvariant: string;

  @IsString()
  readonly refitem: string;

  @IsString()
  readonly refcompany: string;
}
