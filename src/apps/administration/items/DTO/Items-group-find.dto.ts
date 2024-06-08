import { IsOptional, IsString } from 'class-validator';
export class ItemsGroupFindDto {
  @IsString() @IsOptional() readonly refitemgroup: string;

  @IsString() readonly refcompany: string;

  @IsString() readonly reforganisation: string;
}
