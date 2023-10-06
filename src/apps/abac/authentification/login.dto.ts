import { IsInt, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  matricule: string;

  @IsString()
  pwd: string;
}
