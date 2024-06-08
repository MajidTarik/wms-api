import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {UnitsEntity} from '../../../entities/arazan-db/items/units.entity';
import {UnitCreateDto} from './DTO/unit-create.dto';
import {UnitFindDto} from './DTO/unit-find.dto';
import {UnitShowDto} from './DTO/unit-show.dto';
import {PriceModelFindDto} from "./DTO/price-model-find.dto";
import {PriceModelCreateDto} from "./DTO/price-model-create.dto";
import {PriceModelShowDto} from "./DTO/price-model-show.dto";
import {PricemodelEntity} from "../../../entities/arazan-db/items/pricemodel.entity";
import {ItemsFindDto} from "./DTO/Items-find.dto";
import {ItemsEntity} from "../../../entities/arazan-db/items/items.entity";
import {UomConversionCreateDto} from "./DTO/uom-conversion-create.dto";
import {UomconversionEntity} from "../../../entities/arazan-db/items/uomconversion.entity";
import {UomConversionFindDto} from "./DTO/uom-conversion-find.dto";
import {UomclassicconversionEntity} from "../../../entities/arazan-db/items/uomclassicconversion.entity";
import {UomInterneConversionCreateDto} from "./DTO/uom-interne-conversion-create.dto";
import {UomInterneConversionFindDto} from "./DTO/uom-interne-conversion-find.dto";
import {ItemsSaveDto} from "./DTO/Items-save.dto";
import {ParametresService} from "../parametres/parametres.service";
import {CategoriesService} from "../categories/categories.service";
import {ItemsclassSaveDto} from "./DTO/Itemsclass-save.dto";
import {ItemclassEntity} from "../../../entities/arazan-db/items/itemclass.entity";
import {ItemsclassFindDto} from "./DTO/Itemsclass-find.dto";
import {ItemtrackingEntity} from "../../../entities/arazan-db/items/itemtracking.entity";
import {ItemsValidityDto} from "./DTO/Items-validity.dto";
import {MasterdataService} from "../masterdata/masterdata.service";
import {ItemConversionValidityDto} from "./DTO/item-conversion-validity.dto";
import {HelpersProvider} from "../../../helpers/providers/helpers.provider";
import {ClassicConversionValidityDto} from "./DTO/classic-conversion-validity.dto";
import {ItemsreleasedEntity} from "../../../entities/arazan-db/items/itemsreleased.entity";
import {VendorReleaseFindDto} from "../masterdata/DTO/vendor-release-find.dto";
import {VendorReleaseSaveDto} from "../masterdata/DTO/vendor-release-save.dto";
import {ItemReleaseFindDto} from "./DTO/item-release-find.dto";
import {ItemReleaseSaveDto} from "./DTO/item-release-save.dto";
import {ItemsGroupFindDto} from "./DTO/Items-group-find.dto";
import {ItemsgroupEntity} from "../../../entities/arazan-db/items/itemsgroup.entity";

@Injectable({})
export class ItemsService {
    constructor(
        @InjectRepository(UnitsEntity)
        private readonly unitRepository: Repository<UnitsEntity>,
        @InjectRepository(ItemsEntity)
        private readonly itemRepository: Repository<ItemsEntity>,
        @InjectRepository(ItemsreleasedEntity)
        private readonly itemsreleasedRepository: Repository<ItemsreleasedEntity>,
        @InjectRepository(PricemodelEntity)
        private readonly pricemodelRepository: Repository<PricemodelEntity>,
        @InjectRepository(UomconversionEntity)
        private readonly uomconversionRepository: Repository<UomconversionEntity>,
        @InjectRepository(UomclassicconversionEntity)
        private readonly uomclassicconversionRepository: Repository<UomclassicconversionEntity>,
        @InjectRepository(ItemclassEntity)
        private readonly itemclassRepository: Repository<ItemclassEntity>,
        @InjectRepository(ItemtrackingEntity)
        private readonly itemtrackingRepository: Repository<ItemtrackingEntity>,
        @InjectRepository(ItemsgroupEntity)
        private readonly itemgroupRepository: Repository<ItemsgroupEntity>,
        private parametreService: ParametresService,
        private categoriesService: CategoriesService,
        private masterdataService: MasterdataService,
        private helpersProvider: HelpersProvider,
    ) {
    }

    // --------------------------------- Unité
    async createUnit(unitDto: UnitCreateDto) {
        const unit = await this.unitRepository.create(unitDto); // transform the DTO to the entity user
        return await this.unitRepository
            .save(unit)
            .then(async (res) => {
                await this.createUomInterneConversion({
                    actif: true,
                    refunitfrom: res.refunit,
                    refunitto: res.refunit,
                    refcompany: res.refcompany,
                    coefficient: 1,
                    reforganisation: res.reforganisation,
                })
                return await this.unitRepository.findOneBy(unitDto);
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async lookForUnit(unitDto: UnitFindDto) {
        return await this.unitRepository
            .find({
                where: [
                    {
                        refcompany: unitDto.refcompany,
                        reforganisation: unitDto.reforganisation,
                        refunit: unitDto?.refunit || undefined,
                        unit: unitDto?.unit || undefined,
                    },
                ],
                order: {refunit: 'ASC'},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async showUnit(unitDto: UnitShowDto) {
        return await this.unitRepository
            .findOneBy({
                refcompany: unitDto.refcompany,
                refunit: unitDto.refunit,
                reforganisation: unitDto.reforganisation,
            })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query});
            });
    }

    // --------------------------------- Model de prix
    async createPriceModel(pricemodelDto: PriceModelCreateDto) {
        const pricemodel = await this.pricemodelRepository.create(pricemodelDto); // transform the DTO to the entity user
        return await this.pricemodelRepository
            .save(pricemodel)
            .then(async (res) => {
                return await this.pricemodelRepository.findOneBy(pricemodelDto);
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async lookForPriceModel(pricemodelDto: PriceModelFindDto) {
        return await this.pricemodelRepository
            .find({
                where: [
                    {
                        refpricemodel: pricemodelDto?.refpricemodel || undefined,
                        pricemodel: pricemodelDto?.pricemodel || undefined,
                        refcompany: pricemodelDto.refcompany,
                    },
                ],
                order: {refpricemodel: 'ASC'},
                select: {refpricemodel: true, pricemodel: true, actif: true, refcompany: true},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async showPriceModel(pricemodelDto: PriceModelShowDto) {
        return await this.pricemodelRepository
            .findOneBy({refcompany: pricemodelDto.refcompany, refpricemodel: pricemodelDto.refpricemodel})
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query});
            });
    }

    async findPriceModelByCriteria(pricemodelDto: PriceModelFindDto) {
        return await this.pricemodelRepository
            .find({
                where: [
                    {
                        refcompany: pricemodelDto.refcompany,
                    },
                ],
                order: {refpricemodel: 'ASC'},
                select: {refpricemodel: true, pricemodel: true, actif: true, refcompany: true},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    // --------------------------------- Item management
    async lookForItem(itemfinddto: ItemsFindDto) {
        const itemquery = await this.itemsreleasedRepository
            .createQueryBuilder('itemsreleased')
            .innerJoinAndSelect(
                'itemsreleased.item',
                'items',
                'itemsreleased.refcompany = :refcompany and itemsreleased.reforganisation = :reforganisation',
                {refcompany: itemfinddto.refcompany, reforganisation: itemfinddto.reforganisation}
            )
            .leftJoinAndSelect(
                'itemsreleased.pricemodel',
                'pricemodel',
            )
            .leftJoinAndSelect(
                'itemsreleased.headerparametre',
                'headerparametre',
            )
            .leftJoinAndSelect(
                'itemsreleased.unitorder',
                'units unitorder',
            )
            .leftJoinAndSelect(
                'itemsreleased.unitpurch',
                'units unitpurch',
            )
            .leftJoinAndSelect(
                'itemsreleased.unitsales',
                'units unitsales',
            )
            .leftJoinAndSelect(
                'itemsreleased.unitinvent',
                'units unitinvent',
            )

            .leftJoinAndSelect(
                'itemsreleased.itemgroup',
                'itemsgroup',
            )
            .leftJoinAndSelect(
                'itemsreleased.company',
                'company',
            )
            .leftJoinAndSelect(
                'itemsreleased.itemtracking',
                'itemtracking',
            )
            .leftJoinAndSelect(
                'itemsreleased.taxesales',
                'taxe taxesales',
            )
            .leftJoinAndSelect(
                'itemsreleased.taxepurchase',
                'taxe taxepurchase',
            )

        if(!['', undefined, null].includes(itemfinddto.refitem)) {
            itemquery.where('items.refitem = :refitem', { refitem: itemfinddto.refitem })
        }

        return itemquery
            .getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async saveItem(itemdto: ItemsSaveDto) {
        const item = await this.itemRepository.create({
            refitem: itemdto.refitem,
            item: itemdto.item,
            reforganisation: itemdto.reforganisation,
            barcode: itemdto.barcode,
            itemdescription: itemdto.itemdescription,
            searchname: itemdto.searchname,
        });

        const itemrealese = await this.itemsreleasedRepository.create({
            refitem: itemdto.refitem,
            refcompany: itemdto.refcompany,
            reforganisation: itemdto.reforganisation,
            alerttime: itemdto.alerttime,
            bestbeforetime: itemdto.bestbeforetime,
            expirationdate: itemdto.expirationdate,
            idheaderparametre: itemdto.idheaderparametre,
            purchaseprice: itemdto.purchaseprice,
            purchasepriceunit: itemdto.purchasepriceunit,
            refitemgroup: itemdto.refitemgroup,
            refitemtracking: itemdto.refitemtracking,
            refpricemodel: itemdto.refpricemodel,
            reftaxepurchase: itemdto.reftaxepurchase,
            reftaxesales: itemdto.reftaxesales,
            refunitinvent: itemdto.refunitinvent,
            refunitorder: itemdto.refunitorder,
            refunitpurch: itemdto.refunitpurch,
            refunitsales: itemdto.refunitsales,
            removaltime: itemdto.removaltime,
            safetystock: itemdto.safetystock,
            salesprice: itemdto.salesprice,
            salespriceunit: itemdto.salespriceunit,
            stopedinvent: itemdto.stopedinvent,
            stopedpurch: itemdto.stopedpurch,
            stopedsales: itemdto.stopedsales,
        });

        //Check conversion unit
        if (![undefined, null, ''].includes(itemdto.refitem) && ![undefined, null, ''].includes(itemdto.refunitinvent) && ![undefined, null, ''].includes(itemdto.refunitpurch)) {
            await this.isItemConversionValid({
                refitem: itemdto.refitem,
                refcompany: itemdto.refcompany,
                reforganisation: itemdto.reforganisation,
                refunitto: itemdto.refunitpurch,
                refunitfrom: itemdto.refunitinvent
            })
        }

        if (![undefined, null, ''].includes(itemdto.refitem) && ![undefined, null, ''].includes(itemdto.refunitinvent) && ![undefined, null, ''].includes(itemdto.refunitorder)) {
            await this.isItemConversionValid({
                refitem: itemdto.refitem,
                refcompany: itemdto.refcompany,
                reforganisation: itemdto.reforganisation,
                refunitto: itemdto.refunitorder,
                refunitfrom: itemdto.refunitinvent
            })
        }

        if (![undefined, null, ''].includes(itemdto.refitem) && ![undefined, null, ''].includes(itemdto.refunitinvent) && ![undefined, null, ''].includes(itemdto.refunitsales)) {
            await this.isItemConversionValid({
                refitem: itemdto.refitem,
                refcompany: itemdto.refcompany,
                reforganisation: itemdto.reforganisation,
                refunitto: itemdto.refunitsales,
                refunitfrom: itemdto.refunitinvent
            })
        }

        if ([undefined, null, ''].includes(itemdto.refitem)) {
            const refitem = await this.masterdataService.generatepk('ITM');
            item.refitem = refitem;
            itemrealese.refitem = refitem;
        }

        if (!this.helpersProvider.isEmptyObject(itemdto.parametres)) {
            const idheaderparametre = await this.parametreService.checkaxesbycompany(itemdto.reforganisation, itemdto.parametres, itemdto.refcompany, 'ANALYTIC');
            itemrealese['idheaderparametre'] = Number(idheaderparametre);
        }

        return await this.itemRepository
            .save(item)
            .then(async (res) => {
                return await this.itemsreleasedRepository
                    .save(itemrealese)
                    .then(async (res) => {
                        if (!this.helpersProvider.isEmptyObject(itemdto.categories)) {
                            await this.categoriesService.affectationEntityCategories(itemdto.reforganisation, itemdto.categories, itemdto.refcompany, itemdto.refitem, 'ITM')
                        }
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

    // --------------------------------- UOM Conversion Management
    async createUomConversion(uomconversionDto: UomConversionCreateDto) {
        if((uomconversionDto.refunitto == uomconversionDto.refunitfrom) && uomconversionDto.coefficient !== 1 ){
            const message = 'Unité de conversion identique !';
            throw new BadRequestException(message, {cause: message, description: message,});
        }

        const uomconversion = await this.uomconversionRepository.create(uomconversionDto); // transform the DTO to the entity user
        return await this.uomconversionRepository
            .save(uomconversion)
            .then(async (res) => {
                return await this.uomconversionRepository.findOneBy(uomconversionDto);
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async lookForUomconversion(uomconversionfinddto: UomConversionFindDto) {
        const query = await this.uomconversionRepository
            .createQueryBuilder('uomconversion')
            .innerJoinAndSelect('uomconversion.unitfrom', 'units f')
            .innerJoinAndSelect('uomconversion.unitto', 'units t')
            .where('uomconversion.refcompany = :refcompany and uomconversion.reforganisation = :reforganisation', {
                refcompany: uomconversionfinddto.refcompany,
                reforganisation: uomconversionfinddto.reforganisation,
            })

        if(![undefined, null, ''].includes(uomconversionfinddto.refitem)) {
            await query
                .andWhere('uomconversion.refitem = :refitem', {refitem: uomconversionfinddto.refitem});
        }

        if(![undefined, null, ''].includes(uomconversionfinddto.refunitto)) {
            await query
                .andWhere('uomconversion.refunitfrom = :refunitfrom', {refunitfrom: uomconversionfinddto.refunitfrom})
                .andWhere('uomconversion.refunitto = :refunitto', {refunitto: uomconversionfinddto.refunitto})
        }

        return query
            .getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async createUomInterneConversion(uomconversionDto: UomInterneConversionCreateDto) {
        if((uomconversionDto.refunitto == uomconversionDto.refunitfrom) && uomconversionDto.coefficient !== 1){
            const message = 'Unité de conversion identique !';
            throw new BadRequestException(message, {cause: message, description: message,});
        }

        const uomconversion = await this.uomclassicconversionRepository.create(uomconversionDto); // transform the DTO to the entity user
        return await this.uomclassicconversionRepository
            .save(uomconversion)
            .then(async (res) => {
                return await this.uomclassicconversionRepository.findOneBy(uomconversionDto);
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getuomcibycritaria(uomconversionDto: UomInterneConversionFindDto) {
        return await this.uomclassicconversionRepository
            .find({
                where: {
                    refcompany: uomconversionDto.refcompany,
                    refunitfrom: uomconversionDto?.refunitfrom || undefined,
                    refunitto: uomconversionDto?.refunitto || undefined,
                },
                relations: {
                    company: true,
                    unitfrom: true,
                    unitto: true,
                },
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    //---------------------------------------------> Item Class
    async saveItemClass(itemclassDto: ItemsclassSaveDto) {
        /**
        let existingItemClass = await this.itemclassRepository.findOneBy({
            reforganisation: itemclassDto.reforganisation,
            refcompany: itemclassDto.refcompany,
            refwarehouse: itemclassDto.refwarehouse,
            refitem: itemclassDto.refitem
        })
        if (existingItemClass) {
            existingItemClass['class'] = itemclassDto.class;
            existingItemClass['actif'] = itemclassDto.actif;
        } else {
            existingItemClass = new ItemclassEntity();
            existingItemClass['refitem'] = itemclassDto.refitem;
            existingItemClass['refwarehouse'] = itemclassDto.refwarehouse;
            existingItemClass['refcompany'] = itemclassDto.refcompany;
            existingItemClass['actif'] = itemclassDto.actif;
            existingItemClass['class'] = itemclassDto.class;
        }
        const itemclass = await this.itemclassRepository.create(existingItemClass);
         **/
        const itemclass = await this.itemclassRepository.create(itemclassDto);
        return await this.itemclassRepository
            .save(itemclass)
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getItemClass(itemclassDto: ItemsclassFindDto) {
        const query = await this.itemclassRepository.createQueryBuilder('itemclass')
            .innerJoinAndSelect('itemclass.itemrealsed', 'itemsreleased')
            .innerJoinAndSelect('itemclass.warehouse', 'warehouse')
            .innerJoinAndSelect('itemsreleased.item', 'items')
            .where('itemclass.refcompany = :refcompany', {refcompany: itemclassDto.refcompany})
            .andWhere('itemclass.reforganisation = :reforganisation', {reforganisation: itemclassDto.reforganisation})
            .andWhere('itemclass.refitem = :refitem', {refitem: itemclassDto.refitem})

        if (!['', undefined, null].includes(itemclassDto.refwarehouse)) {
            query.andWhere('itemclass.refwarehouse = :refwarehouse', {refwarehouse: itemclassDto.refwarehouse});
        }

        return query.getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getItemTracking() {
        return await this.itemtrackingRepository
            .find()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getItemGroup(itemgroup: ItemsGroupFindDto) {
        return await this.itemgroupRepository
            .findBy({
                refitemgroup: itemgroup.refitemgroup || undefined,
                refcompany: itemgroup.refcompany,
                reforganisation: itemgroup.reforganisation,
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async isItemValid(itemDto: ItemsValidityDto, controlObject) {
        return await this.lookForItem({
            reforganisation: itemDto.reforganisation,
            refitem: itemDto.refitem,
            item: undefined,
            refcompany: itemDto.refcompany,
            searchname: undefined,
            barcode: undefined,
            itemdescription: undefined
        })
            .then(async (res) => {
                let message
                if (res.length != 1) {
                    message = 'Item not founded ' + itemDto.refitem + ' !'

                    throw new BadRequestException(message, {cause: message, description: message,});
                }
                if (controlObject === 'PURCHORDER') {
                    /**
                    if (res[0].stopedpurch) {
                        message = 'Item ' + itemDto.refitem + ' bloqué pour achat!'

                        throw new BadRequestException(message, {cause: message, description: message,});
                    }
                    if ([null, undefined].includes(res[0].reftaxepurchase)) {
                        message = 'Taxe achat non affecté à Item ' + itemDto.refitem + ' !'

                        throw new BadRequestException(message, {cause: message, description: message,});
                    } else {
                        const taxeLineValue = await this.masterdataService.getCurrentTaxeLineValue({
                            refcompany: itemDto.refcompany,
                            reftaxe: res[0].reftaxepurchase,
                            datedebut: undefined
                        })
                        if (taxeLineValue.length != 1) {
                            message = ''//Valeur de taxe non paramétrée ' + res[0].reftaxepurchase + ' !'

                            throw new BadRequestException(message, {cause: message, description: message,});
                        }
                    }
                     **/
                }
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async isItemConversionValid(conversionItemValidityDto: ItemConversionValidityDto) {
        return await this.uomconversionRepository.count({
            where: [
                {
                    refitem: conversionItemValidityDto.refitem,
                    refcompany: conversionItemValidityDto.refcompany,
                    actif: true,
                    refunitfrom: conversionItemValidityDto.refunitfrom,
                    refunitto: conversionItemValidityDto.refunitto,
                },
                {
                    refitem: conversionItemValidityDto.refitem,
                    refcompany: conversionItemValidityDto.refcompany,
                    actif: true,
                    refunitto: conversionItemValidityDto.refunitfrom,
                    refunitfrom: conversionItemValidityDto.refunitto,
                }]
        })
            .then(async (res) => {
                let message;
                const classicCount = await this.isClassicConversionValid({
                    refcompany: conversionItemValidityDto.refcompany,
                    refunitfrom: conversionItemValidityDto.refunitfrom,
                    refunitto: conversionItemValidityDto.refunitto
                });
                if ((res + classicCount) <= 0) {
                    message = 'Item conversion ou classic conversion introuvable ' + conversionItemValidityDto.refitem + ' !'
                    throw new BadRequestException(message, {cause: message, description: message,});
                } else {
                    return (res + classicCount);
                }
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async isClassicConversionValid(classicConversionValidity: ClassicConversionValidityDto) {
        return await this.uomclassicconversionRepository.count({
            where: [
                {
                    refcompany: classicConversionValidity.refcompany,
                    refunitfrom: classicConversionValidity.refunitfrom,
                    refunitto: classicConversionValidity.refunitto,
                    actif: true,
                },
                {
                    refcompany: classicConversionValidity.refcompany,
                    refunitto: classicConversionValidity.refunitfrom,
                    refunitfrom: classicConversionValidity.refunitto,
                    actif: true,
                }
            ]
        })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getReleasedItemByCompany(itemReleaseFindDto: ItemReleaseFindDto) {
        const query = await this.itemsreleasedRepository
            .createQueryBuilder('itemsreleased')
            .innerJoinAndSelect(
                'itemsreleased.company',
                'company',
                'itemsreleased.refitem = :refitem and itemsreleased.reforganisation = :reforganisation',
                {refitem: itemReleaseFindDto.refitem, reforganisation: itemReleaseFindDto.reforganisation}
            );
        if (itemReleaseFindDto.refcompany) {
            query.where('itemsreleased.refcompany = :refcompany', {refcompany: itemReleaseFindDto.refcompany});
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

    async lancerItem(itemDto: ItemReleaseSaveDto) {
        const itemsrelease = await this.itemsreleasedRepository.create(itemDto)
        return await this.itemsreleasedRepository
            .save(itemsrelease)
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }
}
