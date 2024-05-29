import { IsString } from 'class-validator';
export class CityFindDto {
  @IsString()
  readonly refcountry: string;
}
