import { IsOptional, IsString } from 'class-validator';
export class ItemsclassFindDto {
  @IsString() readonly refitem: string;

  @IsString() readonly refcompany: string;

  @IsString()
  @IsOptional()
  readonly refwarehouse: string;
}
