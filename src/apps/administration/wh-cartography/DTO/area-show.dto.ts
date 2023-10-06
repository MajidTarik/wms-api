import { IsString, MaxLength, MinLength } from 'class-validator';
export class AreaShowDto {
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly refarea: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly refcompany: string;
}
