import { IsString } from 'class-validator';
export class ItemsValidityDto {
  @IsString()
  readonly refitem: string;

  @IsString()
  readonly refcompany: string;
}
