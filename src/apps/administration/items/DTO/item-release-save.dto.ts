import { IsString } from "class-validator";
export class ItemReleaseSaveDto {
  @IsString()
  readonly reforganisation: string;

  @IsString()
  readonly refitem: string;

  @IsString()
  readonly refcompany: string;
}
