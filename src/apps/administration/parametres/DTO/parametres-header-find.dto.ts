import { IsNumber, IsObject, IsString } from 'class-validator';

export class ParametresHeaderFindDto {
    @IsString()
    readonly reforganisation: string;

    @IsString()
    readonly refcompany: string;

    @IsObject()
    readonly parametres: object;

    @IsString()
    readonly reftypeparametre: string;
}
