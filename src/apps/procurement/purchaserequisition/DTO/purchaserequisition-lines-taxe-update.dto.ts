import {IsNumber, IsString} from "class-validator";

export class PurchaserequisitionLinesTaxeUpdateDto {
    @IsString()
    readonly refcompany: string;

    @IsString()
    readonly reforganisation: string;

    @IsString()
    readonly refpurchaserequisition: string;

    @IsString()
    readonly reftaxe: string;

    @IsNumber()
    readonly id: number;
}
