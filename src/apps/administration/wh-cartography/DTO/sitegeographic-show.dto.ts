import { IsString, MaxLength, MinLength } from 'class-validator';
export class SitegeographicShowDto {
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly refsitegeographic: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly refcompany: string;
}
