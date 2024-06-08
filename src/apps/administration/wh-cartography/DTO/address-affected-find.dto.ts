import { IsString } from 'class-validator';
export class AddressAffectedFindDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  prefix: string;

  @IsString()
  refObject: string;
}
