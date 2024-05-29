import {IsOptional, IsString} from 'class-validator';
export class FindUserDto {
  @IsString()
  @IsOptional()
  readonly matricule: string;

  @IsString()
  readonly reforganisation: string;
}
