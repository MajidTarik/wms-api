import { IsOptional, IsString } from 'class-validator';
export class CompanyFindDto {
  @IsString()
  readonly reforganisation: string;

  @IsString()
  @IsOptional()
  readonly refcompany: string;

  @IsString()
  @IsOptional()
  readonly company: string;
}
