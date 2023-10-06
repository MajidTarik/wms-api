import { IsString, MaxLength, MinLength } from 'class-validator';
export class CompanyShowDto {
  @IsString()
  @MinLength(3)
  @MaxLength(4)
  readonly refcompany: string;
}
