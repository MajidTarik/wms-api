import { IsString, MaxLength, MinLength } from 'class-validator';
export class AreaShowDto {
  @IsString()
  @MinLength(2)
  readonly refarea: string;

  @IsString()
  @MinLength(2)
  readonly refcompany: string;

  @IsString()
  @MinLength(2)
  readonly reforganisation: string;
}
