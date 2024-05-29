import { IsString } from 'class-validator';
export class DettachDefaultCompanyDto {
  @IsString()
  readonly matricule: string;

  @IsString()
  readonly reforganisation: string;
}
