import {IsOptional, IsString} from 'class-validator';
export class FindUserByMatriculeDto {
  @IsString()
  readonly matricule: string;

  @IsString()
  readonly reforganisation: string;
}
