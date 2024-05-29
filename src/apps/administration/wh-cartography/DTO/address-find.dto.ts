import { IsOptional, IsString } from 'class-validator';
export class AddressFindDto {
  @IsString()
  @IsOptional()
  readonly refaddress: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;
}
