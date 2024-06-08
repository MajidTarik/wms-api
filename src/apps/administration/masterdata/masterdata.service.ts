import {BadRequestException, Body, Injectable} from '@nestjs/common';
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
import {ControlobjectEntity} from "../../../entities/arazan-db/masterdata/controlobject.entity";
import {ControlobjectFindDto} from "./DTO/controlobject-find.dto";
import {of} from "rxjs";
import {TaxeSaveDto} from "./DTO/taxe-save.dto";
import {TaxeFindDto} from "./DTO/taxe-find.dto";
import {TaxeEntity} from "../../../entities/arazan-db/masterdata/taxe.entity";
import {TaxeLineFindDto} from "./DTO/taxe-line-find.dto";
import {TaxeLineEntity} from "../../../entities/arazan-db/masterdata/taxe-line.entity";
import {TaxeLineSaveDto} from "./DTO/taxe-line-save.dto";
import * as moment from "moment/moment";
import {IsOptional, IsString} from "class-validator";
import {DatesProvider} from "../../../helpers/providers/dates.provider";
import {TaxeLineDeleteDto} from "./DTO/taxe-line-delete.dto";
import {TaxeGroupEntity} from "../../../entities/arazan-db/masterdata/taxe-group.entity";
import {TaxeGroupFindDto} from "./DTO/taxe-group-find.dto";
import {TaxeGroupSaveDto} from "./DTO/taxe-group-save.dto";
import {TaxeByGroupEntity} from "../../../entities/arazan-db/masterdata/taxe-by-group.entity";
import {TaxeByGroupSaveDto} from "./DTO/taxe-by-group-save.dto";
import {VendorValidityDto} from "./DTO/vendor-validity.dto";
import {VendorreleasedEntity} from "../../../entities/arazan-db/masterdata/vendorreleased.entity";
import {HelpersProvider} from "../../../helpers/providers/helpers.provider";
import {VendorReleaseFindDto} from "./DTO/vendor-release-find.dto";
import {VendorReleaseSaveDto} from "./DTO/vendor-release-save.dto";

@Injectable()
export class MasterdataService {

    constructor(
        @InjectRepository(VendorEntity)
        private readonly vendorRepository: Repository<VendorEntity>,
        @InjectRepository(VendorreleasedEntity)
        private readonly vendorReleasedRepository: Repository<VendorreleasedEntity>,
        @InjectRepository(CurrencyEntity)
        private readonly currrencyRepository: Repository<CurrencyEntity>,
        @InjectRepository(DeliverymodeEntity)
        private readonly deliverymodeRepository: Repository<DeliverymodeEntity>,
        @InjectRepository(LanguageEntity)
        private readonly languageRepository: Repository<LanguageEntity>,
        @InjectRepository(PaymentconditionEntity)
        private readonly paymentconditionRepository: Repository<PaymentconditionEntity>,
        @InjectRepository(TaxeEntity)
        private readonly taxeRepository: Repository<TaxeEntity>,
        @InjectRepository(TaxeLineEntity)
        private readonly taxelineRepository: Repository<TaxeLineEntity>,
        @InjectRepository(PaymentmethodEntity)
        private readonly paymentmethodRepository: Repository<PaymentmethodEntity>,
        @InjectRepository(VendorgroupEntity)
        private readonly vendorgroupRepository: Repository<VendorgroupEntity>,
        @InjectRepository(VendortypeEntity)
        private readonly vendortypeRepository: Repository<VendortypeEntity>,
        @InjectRepository(ControlobjectEntity)
        private readonly controlObjectRepository: Repository<ControlobjectEntity>,
        @InjectRepository(TaxeGroupEntity)
        private readonly taxeGroupRepository: Repository<TaxeGroupEntity>,
        @InjectRepository(TaxeByGroupEntity)
        private readonly taxeByGroupRepository: Repository<TaxeByGroupEntity>,
        private parametreService: ParametresService,
        private dateProviders: DatesProvider,
        private helpersProvider: HelpersProvider,
    ) {
    }

    // ____________________________________________________ VENDOR MANAGEMENT --------------------------------
    async getReleasedVendorByCompany(vendorReleaseFindDto: VendorReleaseFindDto) {
        const query = await this.vendorReleasedRepository
            .createQueryBuilder('vendorreleased')
            .innerJoinAndSelect(
                'vendorreleased.company',
                'company',
                'vendorreleased.refvendor = :refvendor and vendorreleased.reforganisation = :reforganisation',
                {refvendor: vendorReleaseFindDto.refvendor, reforganisation: vendorReleaseFindDto.reforganisation}
            );
        if (vendorReleaseFindDto.refcompany) {
            query.where('vendorreleased.refcompany = :refcompany', {refcompany: vendorReleaseFindDto.refcompany});
        }
        return query
            .getMany()
            .then(async (res) => {
                return res
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async lancerVendor(vendorDto: VendorReleaseSaveDto) {
        const vendorrelease = await this.vendorReleasedRepository.create(vendorDto)
        return await this.vendorReleasedRepository
            .save(vendorrelease)
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getVendor(vendorDto: VendorFindDto) {
        const vendorquery = await this.vendorReleasedRepository
            .createQueryBuilder('vendorreleased')
            .innerJoinAndSelect(
                'vendorreleased.vendor',
                'vendor',
                'vendorreleased.refcompany = :refcompany and vendorreleased.reforganisation = :reforganisation',
                {refcompany: vendorDto.refcompany, reforganisation: vendorDto.reforganisation}
            )
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
                'vendorreleased.paymentmethod',
                'paymentmethod',
            )
            .leftJoinAndSelect(
                'vendorreleased.paymentcondition',
                'paymentcondition',
            )
            .leftJoinAndSelect(
                'vendorreleased.deliverymode',
                'deliverymode',
            )
            .leftJoinAndSelect(
                'vendorreleased.taxegroup',
                'taxegroup',
            )
            .leftJoinAndSelect(
                'vendorreleased.vendorgroup',
                'vendorgroup',
            )
            .leftJoinAndSelect(
                'vendor.vendorinvoicing',
                'vendor comptefacturation',
            )
        if (!['', undefined, null].includes(vendorDto.refvendor)) {
            vendorquery.andWhere('vendor.refvendor = :refvendor', {refvendor: vendorDto.refvendor})
        }

        return vendorquery
            .getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async saveVendor(vendorDto: VendorSaveDto) {
        const vendor = await this.vendorRepository.create({
            refvendor: vendorDto.refvendor,
            reforganisation: vendorDto.reforganisation,
            refcurrency: vendorDto.refcurrency,
            refvendorinvoicing: vendorDto.refvendorinvoicing,
            cnss: vendorDto.cnss,
            contactdescription: vendorDto.contactdescription,
            contactmail: vendorDto.contactmail,
            contacttelephone: vendorDto.contacttelephone,
            ice: vendorDto.ice,
            nom: vendorDto.nom,
            ncin: vendorDto.ncin,
            if: vendorDto.if,
            patente: vendorDto.patente,
            prenom: vendorDto.prenom,
            reflanguage: vendorDto.reflanguage,
            refvendortype: vendorDto.refvendortype,
            rc: vendorDto.rc,
        })

        const vendorrelease = await this.vendorReleasedRepository.create({
            refvendor: vendorDto.refvendor,
            refcompany: vendorDto.refcompany,
            reftaxegroup: vendorDto.reftaxegroup,
            bloqued: vendorDto.bloqued,
            refdeliverymode: vendorDto.refdeliverymode,
            refvendorgroup: vendorDto.refvendorgroup,
            refpaymentmethod: vendorDto.refpaymentmethod,
            refpaymentcondition: vendorDto.refpaymentcondition,
            idheaderparametre: vendorDto.idheaderparametre,
            reforganisation: vendorDto.reforganisation,
        })

        if ([undefined, null, ''].includes(vendorDto.refvendor)) {
            const ref = await this.generatepk('VD');
            vendor.refvendor = ref;
            vendorrelease.refvendor = ref;
        }


        if (!this.helpersProvider.isEmptyObject(vendorDto.parametres)) {
            const idheaderparametre = await this.parametreService.checkaxesbycompany(vendorDto.reforganisation, vendorDto.parametres, vendorDto.refcompany, 'ANALYTIC')
            vendorrelease['idheaderparametre'] = Number(idheaderparametre);
        }

        return await this.vendorRepository
            .save(vendor)
            .then(async (res) => {
                return await this.vendorReleasedRepository
                    .save(vendorrelease)
                    .then(async (res) => {
                        return res;
                    })
                    .catch((err) => {
                        throw new BadRequestException(err.message, {cause: err, description: err.query,});
                    });
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async isVendorValid(vendorDto: VendorValidityDto) {
        const vendors = await this.getVendor({
            refcompany: vendorDto.refcompany,
            refvendor: vendorDto.refvendor,
            reforganisation: vendorDto.reforganisation
        })
        let message = '';
        if (vendors.length != 1) {
            message = 'Vendor ' + vendorDto.refvendor + ' Introuvable!';
            throw new BadRequestException(message, {cause: message, description: message,});
        }
        /**
         if(vendors[0].bloqued) {
            message = 'Vendor bloqué'+vendorDto.refvendor;
            throw new BadRequestException(message, { cause: message, description: message,});
        }
         if([undefined, null].includes(vendors[0].reftaxegroup)) {
            message = 'Taxe group de Vendor non paramétré'+vendorDto.refvendor;
            throw new BadRequestException(message, { cause: message, description: message,});
        }
         **/
        /**

         if([undefined, null].includes(vendors[0].refcurrency)) {
            message = 'Currency non paramétré '+vendorDto.refvendor;
            throw new BadRequestException(message, { cause: message, description: message,});
        }
         **/

    }

    // ____________________________________________________ MADTERDATA MANAGEMENT --------------------------------

    async findControlobject(controlobjectDto: ControlobjectFindDto) {
        if (!controlobjectDto) {
            throw new BadRequestException('Merci d envoyer au moins un critére', {});
        }
        return await this.controlObjectRepository
            .find({
                where: [{
                    okforworkflows: controlobjectDto?.okforworkflows || undefined,
                    okforgroupcategories: controlobjectDto?.okforgroupcategories || undefined,
                    okforaddress: controlobjectDto?.okforaddress || undefined,
                    refcontrolobject: controlobjectDto?.refcontrolobject || undefined,
                    prefix: controlobjectDto?.prefix || undefined
                }],
                order: {refcontrolobject: 'ASC'},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getCurrency(currencyDto: CurrencyFindDto) {
        return await this.currrencyRepository
            .find({
                order: {refcurrency: 'ASC'},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
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
                order: {refdeliverymode: 'ASC'},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getLanguage(languageDto: LanguageFindDto) {
        return await this.languageRepository
            .find({
                order: {reflanguage: 'ASC'},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
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
                order: {refpaymentcondition: 'ASC'},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
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
                order: {refpaymentmethod: 'ASC'},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
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
                order: {refvendorgroup: 'ASC'},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getVendortype(vendortypeDto: VendortypeFindDto) {
        return await this.vendortypeRepository
            .find({
                order: {refvendortype: 'ASC'},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getVendorInvoice(vendorDto: VendorFindDto) {
        return await this.vendorRepository
            .createQueryBuilder('vendor')
            .where('vendor.reforganisation = :reforganisation', {reforganisation: vendorDto.reforganisation})
            .andWhere('(vendor.refvendor = vendor.refvendorinvoicing OR vendor.refvendorinvoicing is null)')
            .getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async generatepk(prefix) {
        return await this.controlObjectRepository
            .find({
                where: [{
                    prefix: prefix,
                }]
            })
            .then(async (res) => {
                res[0].currentindex = res[0].currentindex + 1;
                await this.controlObjectRepository.save(res[0])
                return prefix + (res[0].currentindex);
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async findTaxe(taxeDto: TaxeFindDto) {
        return await this.taxeRepository
            .find({
                where: [
                    {
                        refcompany: taxeDto.refcompany,
                        reftaxe: taxeDto?.reftaxe || undefined,
                    },
                ],
                order: {reftaxe: 'ASC'},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async saveTaxe(taxeDto: TaxeSaveDto) {
        const taxeEntiry = await this.findTaxe({
            refcompany: taxeDto.refcompany,
            reftaxe: taxeDto.reftaxe,
            reforganisation: taxeDto.reforganisation,
        })
        let taxe;
        if (taxeEntiry.length == 1) {
            taxe = taxeEntiry[0];
            taxe.taxe = taxeDto.taxe;
        } else {
            taxe = await this.taxeRepository.create(taxeDto)
        }
        return await this.taxeRepository
            .save(taxe)
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async findTaxeLine(taxelineDto: TaxeLineFindDto) {
        return await this.taxelineRepository
            .find({
                where: [
                    {
                        refcompany: taxelineDto.refcompany,
                        reftaxe: taxelineDto.reftaxe,
                        datedebut: taxelineDto?.datedebut || undefined,
                        reforganisation: taxelineDto.reforganisation
                    },
                ],
                order: {datedebut: 'DESC'},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async maxDateFinTaxeLine(taxelineDto: TaxeLineFindDto) {
        return await this.taxelineRepository
            .createQueryBuilder('taxeline')
            .select('MAX(taxeline.datefin)', 'maxdatefin')
            .where('taxeline.refcompany = :refcompany and taxeline.reftaxe = :reftaxe and taxeline.reforganisation = :reforganisation',
                {
                    refcompany: taxelineDto.refcompany,
                    reftaxe: taxelineDto.reftaxe,
                    reforganisation: taxelineDto.reforganisation,
                })
            .getRawMany()
            .then(async (res) => {
                if (res[0]['maxdatefin'] == null) {
                    return true
                } else if (this.dateProviders.calculateDateDifferenceInDays(new Date(res[0]['maxdatefin']), new Date(taxelineDto.datedebut)) == 1) {
                    return true
                } else {
                    const message = 'date debut invalide';
                    throw new BadRequestException(message, {cause: message, description: message,});
                }
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async saveTaxeLine(taxelineDto: TaxeLineSaveDto) {
        const existingTaxeLineEntity = await this.findTaxeLine({
            refcompany: taxelineDto.refcompany,
            reftaxe: taxelineDto.reftaxe,
            datedebut: taxelineDto.datedebut,
            reforganisation: taxelineDto.reforganisation,
        });
        if (existingTaxeLineEntity.length == 1) {
            const message = 'Taxe Ligne exist deja !'
            throw new BadRequestException(message, {cause: message, description: message});
        } else {
            //Ajouter taxe ligne
            const isdatetaxelignevalide = await this.maxDateFinTaxeLine({
                refcompany: taxelineDto.refcompany,
                reftaxe: taxelineDto.reftaxe,
                datedebut: taxelineDto.datedebut,
                reforganisation: taxelineDto.reforganisation,
            });
            const taxeline = await this.taxelineRepository.create(taxelineDto)
            return await this.taxelineRepository
                .save(taxeline)
                .then(async (res) => {
                    return res;
                })
                .catch((err) => {
                    throw new BadRequestException(err.message, {cause: err, description: err.query,});
                });
        }
    }

    async deleteTaxeLine(taxelineDto: TaxeLineDeleteDto) {
        const existingTaxeLineEntity = await this.findTaxeLine({
            refcompany: taxelineDto.refcompany,
            reforganisation: taxelineDto.reforganisation,
            reftaxe: taxelineDto.reftaxe,
            datedebut: taxelineDto.datedebut,
        });
        if (existingTaxeLineEntity.length == 0) {
            const message = 'Taxe Ligne inéxistant !'
            throw new BadRequestException(message, {cause: message, description: message});
        } else {
            const taxeline = await this.taxelineRepository.create(taxelineDto)
            return await this.taxelineRepository
                .remove(taxeline)
                .then(async (res) => {
                    return res;
                })
                .catch((err) => {
                    throw new BadRequestException(err.message, {cause: err, description: err.query,});
                });
        }
    }

    async findTaxeGroup(taxeDto: TaxeGroupFindDto) {
        const query = await this.taxeGroupRepository
            .createQueryBuilder('taxegroup')
            .where('taxegroup.refcompany = :refcompany and taxegroup.reforganisation = :reforganisation', {
                refcompany: taxeDto.refcompany,
                reforganisation: taxeDto.reforganisation
            })
        if (![undefined, null, ''].includes(taxeDto['reftaxegroup'])) {
            query.andWhere('taxegroup.reftaxegroup = :reftaxegroup ', {reftaxegroup: taxeDto?.reftaxegroup || undefined})
        }

        return query.getMany()
            .then(async (res) => {
                if (res.length == 1) {
                    res[0]['taxesNotAffected'] = await this.getTaxeNotAffectedToGroup(taxeDto);
                    res[0]['taxesAffected'] = await this.getAffectedTaxeByGroup(taxeDto);
                }
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async saveTaxeGroup(taxeDto: TaxeGroupSaveDto) {
        const taxeGroup = await this.taxeGroupRepository.create(taxeDto)
        return await this.taxeGroupRepository
            .save(taxeGroup)
            .then(async (res) => {
                if (taxeDto.affectedtaxes) {
                    await this.taxeAffectation({
                        refcompany: taxeDto.refcompany,
                        reftaxegroup: taxeDto.reftaxegroup,
                        affectedtaxes: taxeDto.affectedtaxes.map((line) => ({
                            refcompany: taxeDto.refcompany,
                            reftaxegroup: taxeDto.reftaxegroup,
                            reftaxe: line.reftaxe,
                            reforganisation: taxeDto.reforganisation,
                        })),
                        reforganisation: taxeDto.reforganisation,
                    });
                }
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async taxeAffectation(taxeDto: TaxeByGroupSaveDto) {
        return await this.taxeByGroupRepository.findBy({
            refcompany: taxeDto.refcompany,
            reftaxegroup: taxeDto.reftaxegroup,
        })
            .then(async (res) => {
                await this.taxeByGroupRepository.remove(res)
                    .then(async (res) => {
                        await this.taxeByGroupRepository.save(taxeDto.affectedtaxes)
                            .then(async (res) => {
                                return res
                            })
                            .catch((err) => {
                                throw new BadRequestException(err.message, {cause: err, description: err.query,});
                            });
                    })
                    .catch((err) => {
                        throw new BadRequestException(err.message, {cause: err, description: err.query,});
                    });
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getTaxeNotAffectedToGroup(taxeDto: TaxeGroupFindDto) {
        return await this.taxeRepository
            .createQueryBuilder('taxe')
            .leftJoinAndSelect('taxe.groupsbytaxe', 'taxebygroup', 'taxebygroup.reftaxegroup = :reftaxegroup and taxebygroup.refcompany = :refcompany', {
                reftaxegroup: taxeDto.reftaxegroup,
                refcompany: taxeDto.refcompany
            })
            .where('taxe.refcompany = :refcompany', {refcompany: taxeDto.refcompany})
            .andWhere('taxebygroup.reftaxegroup is null ')
            .getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getAffectedTaxeByGroup(taxeDto: TaxeGroupFindDto) {
        return await this.taxeRepository
            .createQueryBuilder('taxe')
            .innerJoinAndSelect('taxe.groupsbytaxe', 'taxebygroup', 'taxebygroup.reftaxegroup = :reftaxegroup and taxebygroup.refcompany = :refcompany', {
                reftaxegroup: taxeDto.reftaxegroup,
                refcompany: taxeDto.refcompany
            })
            .getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getCurrentTaxeLineValue(taxelineDto: TaxeLineFindDto) {
        return await this.taxelineRepository
            .createQueryBuilder('taxeline')
            .where('cast(now() as date)  between taxeline.datedebut and taxeline.datefin')
            .andWhere('taxeline.refcompany = :refcompany and taxeline.reftaxe = :reftaxe', {
                refcompany: taxelineDto.refcompany,
                reftaxe: taxelineDto.reftaxe
            })
            .getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async isTaxeAffectationCorrect(affectationTaxeToGroup: { reftaxe: string, reftaxegroup: string, refcompany: string, reforganisation: string }[], refcompany: string, reforganisation: string) {
        return await this.taxeByGroupRepository.findBy({
            refcompany: refcompany,
            reforganisation: reforganisation
        })
            .then(async (res) => {
                let message = '';
                for (let i = 0; i < affectationTaxeToGroup.length; i++) {
                    if (!res.find((affect) => affect.reftaxe == affectationTaxeToGroup[i].reftaxe && affect.reftaxegroup == affectationTaxeToGroup[i].reftaxegroup)) {
                        message = 'Affectation invalid ' + affectationTaxeToGroup[i].reftaxe + ' to ' + affectationTaxeToGroup[i].reftaxegroup + ' !'
                        throw new BadRequestException(message, {cause: message, description: message,});
                    }
                }
                return res
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }
}
