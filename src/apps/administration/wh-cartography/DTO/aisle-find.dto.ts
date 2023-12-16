import { IsOptional, IsString } from 'class-validator';
export class AisleFindDto {
  @IsString()
  @IsOptional()
  readonly refaisle: string;


  @IsString()
  readonly refcompany: string;
}
