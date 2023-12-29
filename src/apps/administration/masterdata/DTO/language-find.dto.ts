import { IsOptional, IsString } from "class-validator";
export class LanguageFindDto {
  @IsString()
  @IsOptional()
  readonly reflanguage: string;
}
