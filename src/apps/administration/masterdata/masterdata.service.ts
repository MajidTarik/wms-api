import {BadRequestException, Injectable} from '@nestjs/common';
import {UnitFindDto} from "../items/DTO/unit-find.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {UnitsEntity} from "../../../entities/arazan-db/items/units.entity";
import {Repository} from "typeorm";
import {VendorEntity} from "../../../entities/arazan-db/masterdata/vendor.entity";
import {VendorFindDto} from "./DTO/vendor-find.dto";
import {VendorSaveDto} from "./DTO/vendor-save.dto";
import {CurrencyFindDto} from "./DTO/currency-find.dto";
import {CurrencyEntity} from "../../../entities/arazan-db/masterdata/currency.entity";
import {DeliverymodeFindDto} from "./DTO/deliverymode-find.dto";
import {DeliverymodeEntity} from "../../../entities/arazan-db/masterdata/deliverymode.entity";
import {LanguageFindDto} from "./DTO/language-find.dto";
import {LanguageEntity} from "../../../entities/arazan-db/masterdata/language.entity";
import {PaymentconditionFindDto} from "./DTO/paymentcondition-find.dto";
import {PaymentconditionEntity} from "../../../entities/arazan-db/masterdata/paymentcondition.entity";
import {PaymentmethodFindDto} from "./DTO/paymentmethod-find.dto";
import {PaymentmethodEntity} from "../../../entities/arazan-db/masterdata/paymentmethod.entity";
import {VendorgroupFindDto} from "./DTO/vendorgroup-find.dto";
import {VendorgroupEntity} from "../../../entities/arazan-db/masterdata/vendorgroup.entity";
import {VendortypeFindDto} from "./DTO/vendortype-find.dto";
import {VendortypeEntity} from "../../../entities/arazan-db/masterdata/vendortype.entity";
import {ParametresService} from "../parametres/parametres.service";

@Injectable()
export class MasterdataService {

    constructor(
        @InjectRepository(VendorEntity)
        private readonly vendorRepository: Repository<VendorEntity>,

        @InjectRepository(CurrencyEntity)
        private readonly currrencyRepository: Repository<CurrencyEntity>,

        @InjectRepository(DeliverymodeEntity)
        private readonly deliverymodeRepository: Repository<DeliverymodeEntity>,

        @InjectRepository(LanguageEntity)
        private readonly languageRepository: Repository<LanguageEntity>,

        @InjectRepository(PaymentconditionEntity)
        private readonly paymentconditionRepository: Repository<PaymentconditionEntity>,

        @InjectRepository(PaymentmethodEntity)
        private readonly paymentmethodRepository: Repository<PaymentmethodEntity>,

        @InjectRepository(VendorgroupEntity)
        private readonly vendorgroupRepository: Repository<VendorgroupEntity>,

        @InjectRepository(VendortypeEntity)
        private readonly vendortypeRepository: Repository<VendortypeEntity>,

        private parametreService: ParametresService,

    ){}

    // ____________________________________________________ VENDOR MANAGEMENT --------------------------------
    async getVendor(vendorDto: VendorFindDto) {

        const vendorquery = await this.vendorRepository
            .createQueryBuilder('vendor')
            .leftJoinAndSelect(
                'vendor.language',
                'language',
            )
            .leftJoinAndSelect(
                'vendor.vendortype',
                'vendortype',
            )
            .leftJoinAndSelect(
                'vendor.currency',
                'currency',
            )
            .leftJoinAndSelect(
                'vendor.paymentmethod',
                'paymentmethod',
            )
            .leftJoinAndSelect(
                'vendor.paymentcondition',
                'paymentcondition',
            )
            .leftJoinAndSelect(
                'vendor.deliverymode',
                'deliverymode',
            )
            .leftJoinAndSelect(
                'vendor.vendorgroup',
                'vendorgroup',
            )
            .leftJoinAndSelect(
                'vendor.vendorinvoicing',
                'vendor comptefacturation',
            )
            .where('vendor.refcompany = :refcompany', { refcompany: vendorDto.refcompany })
        if(!['', undefined, null].includes(vendorDto.refvendor)) {
            vendorquery.andWhere('vendor.refvendor = :refvendor', { refvendor: vendorDto.refvendor })
        }

        return vendorquery
            .getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async saveVendor(vendorDto: VendorSaveDto) {
        const idheaderparametre = await this.parametreService.checkaxesbycompany( vendorDto.parametres, vendorDto.refcompany, 'ANALYTIC' )
        vendorDto['idheaderparametre'] = Number(idheaderparametre);
        const vendor = await this.vendorRepository.create(vendorDto)
        console.log(vendor);
        return await this.vendorRepository
            .save(vendor)
            .then(async (res) => {
                console.log(res);
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    // ____________________________________________________ MADTERDATA MANAGEMENT --------------------------------
    async getCurrency(currencyDto: CurrencyFindDto) {
        return await this.currrencyRepository
            .find({
                order: { refcurrency: 'ASC' },
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async getDeliverymode(deliverymodeDto: DeliverymodeFindDto) {
        return await this.deliverymodeRepository
            .find({
                where: [
                    {
                        refcompany: deliverymodeDto.refcompany,
                        refdeliverymode: deliverymodeDto?.refdeliverymode || undefined,
                    },
                ],
                order: { refdeliverymode: 'ASC' },
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async getLanguage(languageDto: LanguageFindDto) {
        return await this.languageRepository
            .find({
                order: { reflanguage: 'ASC' },
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async getPaymentcondition(paymentconditionDto: PaymentconditionFindDto) {
        return await this.paymentconditionRepository
            .find({
                where: [
                    {
                        refcompany: paymentconditionDto.refcompany,
                        refpaymentcondition: paymentconditionDto?.refpaymentcondition || undefined,
                    },
                ],
                order: { refpaymentcondition: 'ASC' },
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async getPaymentmethod(paymentmethodDto: PaymentmethodFindDto) {
        return await this.paymentmethodRepository
            .find({
                where: [
                    {
                        refcompany: paymentmethodDto.refcompany,
                        refpaymentmethod: paymentmethodDto?.refpaymentmethod || undefined,
                    },
                ],
                order: { refpaymentmethod: 'ASC' },
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async getVendorgroup(vendorgroupDto: VendorgroupFindDto) {
        return await this.vendorgroupRepository
            .find({
                where: [
                    {
                        refcompany: vendorgroupDto.refcompany,
                        refvendorgroup: vendorgroupDto?.refvendorgroup || undefined,
                    },
                ],
                order: { refvendorgroup: 'ASC' },
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async getVendortype(vendortypeDto: VendortypeFindDto) {
        return await this.vendortypeRepository
            .find({
                order: { refvendortype: 'ASC' },
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async getVendorInvoice(vendorDto: VendorFindDto) {
        return await this.vendorRepository
            .createQueryBuilder('vendor')
            .where('vendor.refcompany = :refcompany', { refcompany: vendorDto.refcompany })
            .andWhere('(vendor.refvendor = vendor.refvendorinvoicing OR vendor.refvendorinvoicing is null)')
            .getMany()
            .then(async (res) => {
                console.log('----------------->',res)
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }
}
