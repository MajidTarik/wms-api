import {Body, Controller, Get, HttpException, Param, Post} from '@nestjs/common';
import { PurchaserequisitionService } from "./purchaserequisition.service";
import {PurchaserequisitionSaveDto} from "./DTO/purchaserequisition-save.dto";
import {PurchaserequisitionFindDto} from "./DTO/purchaserequisition-find.dto";
import {CategoriesAffectationDto} from "../../administration/categories/DTO/categories-Affectation.dto";
import {PurchaserequisitionChangeStatutDto} from "./DTO/purchaserequisition-change-statut.dto";
import {PurchaserequisitionLinesFindDto} from "./DTO/purchaserequisition-lines-find.dto";
import {PurchaserequisitionLinesNewDto} from "./DTO/purchaserequisition-lines-new.dto";
import {PurchaserequisitionLinesQtyUpsertDto} from "./DTO/purchaserequisition-lines-qty-upsert.dto";
import {PurchaserequisitionLinesPriceUpsertDto} from "./DTO/purchaserequisition-lines-price-upsert.dto";
import {PurchaserequisitionLinesItemUpdateDto} from "./DTO/purchaserequisition-lines-item-update.dto";
import {PurchaserequisitionLinesAxeAnalyticsDto} from "./DTO/purchaserequisition-lines-axe-analytics.dto";
import {PurchaserequisitionLinesVendorUpdateDto} from "./DTO/PurchaserequisitionLinesVendorUpdateDto";
import {PurchaserequisitionLinesDeleteDto} from "./DTO/purchaserequisition-lines-delete.dto";
import {
    PurchaserequisitionLinesDiscountValueUpsertDto
} from "./DTO/purchaserequisition-lines-discount-value-upsert.dto";
import {
    PurchaserequisitionLinesDiscountPercentageUpsertDto
} from "./DTO/purchaserequisition-lines-discount-percentage-upsert.dto";
import {PurchaserequisitionLinesTaxeUpdateDto} from "./DTO/purchaserequisition-lines-taxe-update.dto";

@Controller('purchaserequisition')
export class PurchaserequisitionController {

    constructor(private purchReqService: PurchaserequisitionService) {}

    // ____________________________________________________ PURCHASEREQUISITION MANAGEMENT --------------------------------

    @Post('getpurchrequisitions')
    async getPurchRequisitions(@Body() purchaserequisitionFindDto: PurchaserequisitionFindDto) {
        try {
            return await this.purchReqService.getPurchRequisitions(purchaserequisitionFindDto);
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

    @Post('savepurchrequisitions')
    async savePurchRequisitions(@Body() purchaserequisitionSaveDto: PurchaserequisitionSaveDto) {
        try {
            return await this.purchReqService.savePurchRequisitions(purchaserequisitionSaveDto);
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

    @Post('purchreqstatutsmanagement')
    async purchReqStatutsManagement(@Body() purchaserequisitionChangeStatutDto: PurchaserequisitionChangeStatutDto) {
        try {
            return await this.purchReqService.purchReqStatutsManagement(purchaserequisitionChangeStatutDto);
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

    // ____________________________________________________ PURCHASEREQUISITION LINES MANAGEMENT --------------------------------
    @Post('getpurchreqlines')
    async getPurchReqLines(@Body() purchaserequisitionlinesFindDto: PurchaserequisitionLinesFindDto) {
        try {
            return await this.purchReqService.getPurchReqLines(purchaserequisitionlinesFindDto);
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

    @Post('upsertpurchreqlineitem')
    async savePurchReqLineItem(@Body() purchaserequisitionlinesFindDto: PurchaserequisitionLinesItemUpdateDto) {
        try {
            return await this.purchReqService.upsertPurchReqLineItem(purchaserequisitionlinesFindDto);
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

    @Post('upsertpurchreqlineqty')
    async upsertPurchReqLineQty(@Body() purchaserequisitionlinesFindDto: PurchaserequisitionLinesQtyUpsertDto) {
        try {
            return await this.purchReqService.upsertPurchReqLineQty(purchaserequisitionlinesFindDto);
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

    @Post('upsertpurchreqlineprice')
    async upsertPurchReqLinePrice(@Body() purchaserequisitionlinesFindDto: PurchaserequisitionLinesPriceUpsertDto) {
        try {
            return await this.purchReqService.upsertPurchReqLinePrice(purchaserequisitionlinesFindDto);
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

    @Post('upsertpurchreqlinediscountvalue')
    async upsertPurchReqLineDiscountValue(@Body() purchaserequisitionlinesFindDto: PurchaserequisitionLinesDiscountValueUpsertDto) {
        try {
            return await this.purchReqService.upsertPurchReqLineDiscountValue(purchaserequisitionlinesFindDto);
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

    @Post('upsertpurchreqlinediscountpercentage')
    async upsertPurchReqLineDiscountPercentage(@Body() purchaserequisitionlinesFindDto: PurchaserequisitionLinesDiscountPercentageUpsertDto) {
        try {
            return await this.purchReqService.upsertPurchReqLineDiscountPercentage(purchaserequisitionlinesFindDto);
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

    @Post('newpurchreqlineitem')
    async newPurchReqLineItem(@Body() purchaserequisitionlinesdDto: PurchaserequisitionLinesNewDto) {
        try {
            return await this.purchReqService.newPurchReqLineItem(purchaserequisitionlinesdDto);
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

    @Post('updatepurchreqlineaxesanalytics')
    async updatePurchReqLineAxesAnalytics(@Body() purchaserequisitionlinesaxeanalyticsDto: PurchaserequisitionLinesAxeAnalyticsDto) {
        try {
            return await this.purchReqService.updatePurchReqLineAxesAnalytics(purchaserequisitionlinesaxeanalyticsDto);
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

    @Post('updatevendor')
    async updateVendor(@Body() purchaserequisitionlinesFindDto: PurchaserequisitionLinesVendorUpdateDto) {
        try {
            return await this.purchReqService.updateVendor(purchaserequisitionlinesFindDto);
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

    @Post('deletepurchreqline')
    async deletePurchReqLine(@Body() purchaserequisitionlinesDeleteDto: PurchaserequisitionLinesDeleteDto) {
        try {
            return await this.purchReqService.deletePurchReqLine(purchaserequisitionlinesDeleteDto);
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

    @Post('updatetaxe')
    async updateTaxe(@Body() purchrequisitionlinetaxeDto: PurchaserequisitionLinesTaxeUpdateDto){
        try {
            return await this.purchReqService.updateTaxe(purchrequisitionlinetaxeDto);
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
