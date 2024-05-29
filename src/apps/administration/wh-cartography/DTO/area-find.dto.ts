import {IsOptional, IsString, MinLength} from 'class-validator';
export class AreaFindDto {
  @IsString()
  @IsOptional()
  readonly refarea: string;

  @IsString()
  @IsOptional()
  readonly area: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  @IsOptional()
  readonly refwarehouse: string;

  @IsString()
  @MinLength(2)
  readonly reforganisation: string;
}
