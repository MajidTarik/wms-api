import { IsOptional, IsString } from 'class-validator';
export class AisleFindDto {
  @IsString()
  @IsOptional()
  readonly refaisle: string;

  @IsString()
  @IsOptional()
  readonly refarea: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;
}
