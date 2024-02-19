import { IsString } from 'class-validator';
export class ItemsVariantValidityDto {
  @IsString()
  readonly refitem: string;

  @IsString()
  readonly refcompany: string;
}
