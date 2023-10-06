import { IsInt } from 'class-validator';
export class FindUserDto {
  @IsInt()
  readonly matricule: string;
}
