import {IsBoolean, IsOptional, IsString} from "class-validator";
export class ItemReleaseFindDto {
  @IsString()
  readonly reforganisation: string;

  @IsString()
  readonly refitem: string;

  @IsString()
  @IsOptional()
  readonly refcompany: string;
}
