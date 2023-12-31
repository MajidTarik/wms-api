import { IsOptional, IsString } from 'class-validator';
export class AreaFindDto {
  @IsString()
  @IsOptional()
  readonly refarea: string;

  @IsString()
  @IsOptional()
  readonly area: string;

  @IsString()
  readonly refcompany: string;
}
