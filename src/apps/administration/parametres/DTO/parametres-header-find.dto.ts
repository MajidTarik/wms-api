import { IsNumber, IsObject, IsString } from 'class-validator';

export class ParametresHeaderFindDto {
    @IsString()
    readonly refcompany: string;

    @IsObject()
    readonly parametres: object;

    @IsString()
    readonly reftypeparametre: string;
}
