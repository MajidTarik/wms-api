import {Body, Controller, Get, HttpException, Param, Post} from '@nestjs/common';
import { PurchaseorderService } from "./purchaseorder.service";
import {
    PurchaserequisitionLinesAxeAnalyticsDto
} from "../purchaserequisition/DTO/purchaserequisition-lines-axe-analytics.dto";
import {PurchaseorderFindDto} from "./DTO/purchaseorder-find.dto";

@Controller('purchaseorder')
export class PurchaseorderController {
    constructor(private purchOrderService: PurchaseorderService) {}

    @Post('getpurchaseorder')
    async getPurchaseOrder(@Body() purchaseorderFindDto: PurchaseorderFindDto) {
        try {
            return await this.purchOrderService.getPurchOrder(purchaseorderFindDto);
        } catch (e) {
            throw new HttpException(
                {
                    status: e.status,
                    error: e.response.error,
                },
                e.status,
                {
                    cause: e,
                },
            );
        }
    }
}
