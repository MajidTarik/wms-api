import {IsOptional, IsString} from 'class-validator';
export class LocationFindDto {
  @IsString()
  readonly refaisle: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  @IsOptional()
  readonly reflocation: string;
}
