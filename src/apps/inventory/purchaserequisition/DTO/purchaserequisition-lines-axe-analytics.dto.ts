import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
export class PurchaserequisitionLinesAxeAnalyticsDto {
    @IsString()
    readonly refcompany: string;

    @IsString()
    readonly refpurchaserequisition: string;

    @IsNumber()
    readonly id: number;

    @IsObject()
    readonly parametres: object;

    @IsNumber()
    idheaderparametre: number;
}
