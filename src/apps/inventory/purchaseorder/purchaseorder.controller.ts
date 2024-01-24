import {Body, Controller, Get, HttpException, Param, Post} from '@nestjs/common';
import { PurchaseorderService } from "./purchaseorder.service";

@Controller('purchaseorder')
export class PurchaseorderController {
    constructor(private purchOrderService: PurchaseorderService) {}
}
