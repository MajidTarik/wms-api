import { IsString } from 'class-validator';
export class SetDefaultCompanyDto {
  @IsString()
  readonly matricule: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;
}
