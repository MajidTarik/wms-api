import { IsString, MaxLength, MinLength } from 'class-validator';
export class UnitShowDto {
  @IsString()
  readonly refunit: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;
}
