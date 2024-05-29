import { IsString, MaxLength, MinLength } from 'class-validator';
export class SitegeographicShowDto {
  @IsString()
  @MinLength(2)
  readonly refsitegeographic: string;

  @IsString()
  @MinLength(2)
  readonly refcompany: string;

  @IsString()
  @MinLength(2)
  readonly reforganisation: string;
}
