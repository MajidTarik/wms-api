import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class AddressSaveDto {
  @IsString()
  @IsOptional()
  refaddress: string;

  @IsString()
  readonly refcompany: string;

  @IsBoolean()
  readonly actif: boolean;

  @IsString()
  readonly location: string;

  @IsString()
  readonly state: string;

  @IsString()
  readonly zipcode: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly refcity: string;

  @IsString()
  readonly refcountry: string;

  @IsString()
  readonly reforganisation: string;
}
