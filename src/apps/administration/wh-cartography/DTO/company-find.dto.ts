import { IsOptional, IsString } from 'class-validator';
export class CompanyFindDto {
  @IsString()
  @IsOptional()
  readonly refcompany: string;

  @IsString()
  @IsOptional()
  readonly company: string;
}
