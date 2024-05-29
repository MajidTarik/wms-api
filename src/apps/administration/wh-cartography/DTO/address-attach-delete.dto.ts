import { IsString } from 'class-validator';
export class AddressAttachDeleteDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;

  @IsString()
  prefix: string;

  @IsString()
  refObject: string;

  @IsString()
  refaddresstype: string;

  @IsString()
  refaddress: string;
}
