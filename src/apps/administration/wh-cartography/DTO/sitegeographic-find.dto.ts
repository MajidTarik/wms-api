import { IsOptional, IsString } from 'class-validator';
export class SitegeographicFindDto {
  @IsString()
  @IsOptional()
  readonly refsitegeographic: string;

  @IsString()
  @IsOptional()
  readonly sitegeographic: string;

  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reforganisation: string;
}
