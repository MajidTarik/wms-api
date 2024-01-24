import {IsNumber, IsOptional, IsString} from "class-validator";
export class PurchaserequisitionLinesVendorUpdateDto {
    @IsString()
    readonly refcompany: string;

    @IsString()
    readonly refpurchaserequisition: string;

    @IsNumber()
    readonly id: number;

    @IsString()
    readonly refvendor: string;
}
