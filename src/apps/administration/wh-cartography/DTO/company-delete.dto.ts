import { IsString, MaxLength, MinLength } from 'class-validator';
export class CompanyDeleteDto {
  @IsString()
  @MinLength(3)
  @MaxLength(4)
  readonly refcompany: string;
}
