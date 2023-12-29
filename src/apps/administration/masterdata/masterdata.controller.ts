import {Body, Controller, Get, HttpException, Param, Post} from '@nestjs/common';
import { MasterdataService } from "./masterdata.service";
import { VendorFindDto } from "./DTO/vendor-find.dto";
import {VendorSaveDto} from "./DTO/vendor-save.dto";
import {CurrencyFindDto} from "./DTO/currency-find.dto";
import {DeliverymodeFindDto} from "./DTO/deliverymode-find.dto";
import {LanguageFindDto} from "./DTO/language-find.dto";
import {PaymentconditionFindDto} from "./DTO/paymentcondition-find.dto";
import {PaymentmethodFindDto} from "./DTO/paymentmethod-find.dto";
import {VendorgroupFindDto} from "./DTO/vendorgroup-find.dto";
import {VendortypeFindDto} from "./DTO/vendortype-find.dto";

@Controller('masterdata')
export class MasterdataController {

    constructor(private masterdataService: MasterdataService) {}

    // ____________________________________________________ VENDOR MANAGEMENT --------------------------------
    @Post('getvendor')
    async getVendors(@Body() vendorDto: VendorFindDto) {
        try {
            return await this.masterdataService.getVendor(vendorDto);
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

    @Post('getvendorinvoice')
    async getVendorInvoice(@Body() vendorDto: VendorFindDto) {
        try {
            return await this.masterdataService.getVendorInvoice(vendorDto);
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

    @Post('savevendor')
    async saveVendor(@Body() vendorDto: VendorSaveDto) {
        try {
            return await this.masterdataService.saveVendor(vendorDto);
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

    // ____________________________________________________ MASTERDATA MANAGEMENT --------------------------------
    @Post('getcurrency')
    async getCurrency(@Body() currencyDto: CurrencyFindDto) {
        try {
            return await this.masterdataService.getCurrency(currencyDto);
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

    @Post('getdeliverymode')
    async getDeliverymode(@Body() deliverymodeDto: DeliverymodeFindDto) {
        try {
            return await this.masterdataService.getDeliverymode(deliverymodeDto);
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

    @Post('getlanguage')
    async getLanguage(@Body() languageDto: LanguageFindDto) {
        try {
            return await this.masterdataService.getLanguage(languageDto);
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

    @Post('getpaymentcondition')
    async getPaymentcondition(@Body() paymentconditionDto: PaymentconditionFindDto) {
        try {
            return await this.masterdataService.getPaymentcondition(paymentconditionDto);
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

    @Post('getpaymentmethod')
    async getPaymentmethod(@Body() paymentmethodDto: PaymentmethodFindDto) {
        try {
            return await this.masterdataService.getPaymentmethod(paymentmethodDto);
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

    @Post('getvendorgroup')
    async getVendorgroup(@Body() vendorgroupDto: VendorgroupFindDto) {
        try {
            return await this.masterdataService.getVendorgroup(vendorgroupDto);
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

    @Post('getvendortype')
    async getVendortype(@Body() vendortypeDto: VendortypeFindDto) {
        try {
            return await this.masterdataService.getVendortype(vendortypeDto);
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
