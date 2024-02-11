import { IsString } from 'class-validator';
export class TaxeLineDeleteDto {
  @IsString()
  readonly refcompany: string;

  @IsString()
  readonly reftaxe: string;

  @IsString()
  readonly datedebut: string;
}
