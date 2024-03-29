import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UnitsEntity } from '../../../entities/arazan-db/items/units.entity';
import { UnitCreateDto } from './DTO/unit-create.dto';
import { UnitFindDto } from './DTO/unit-find.dto';
import { UnitShowDto } from './DTO/unit-show.dto';
import { PriceModelFindDto } from "./DTO/price-model-find.dto";
import { PriceModelCreateDto } from "./DTO/price-model-create.dto";
import { PriceModelShowDto } from "./DTO/price-model-show.dto";
import { PricemodelEntity } from "../../../entities/arazan-db/items/pricemodel.entity";
import { ItemsFindDto } from "./DTO/Items-find.dto";
import { ItemsEntity } from "../../../entities/arazan-db/items/items.entity";
import { UomConversionCreateDto } from "./DTO/uom-conversion-create.dto";
import { UomconversionEntity } from "../../../entities/arazan-db/items/uomconversion.entity";
import { UomConversionFindDto } from "./DTO/uom-conversion-find.dto";
import { UomclassicconversionEntity } from "../../../entities/arazan-db/items/uomclassicconversion.entity";
import { UomInterneConversionCreateDto } from "./DTO/uom-interne-conversion-create.dto";
import { UomInterneConversionFindDto } from "./DTO/uom-interne-conversion-find.dto";
import { ItemsSaveDto } from "./DTO/Items-save.dto";
import { ParametresService } from "../parametres/parametres.service";
import { VariantSaveDto } from "./DTO/Variant-save.dto";
import { VariantsEntity } from "../../../entities/arazan-db/items/variants.entity";
import { VariantsFindDto } from "./DTO/variants-find.dto";
import { UomConversionVariantCreateDto } from "./DTO/uom-conversion-variant-create.dto";
import { UomconversionvariantEntity } from "../../../entities/arazan-db/items/uomconversionvariant.entity";
import { UomConversionVariantFindDto } from "./DTO/uom-conversion-variant-find.dto";
import { CategoriesService } from "../categories/categories.service";
import {ItemsclassSaveDto} from "./DTO/Itemsclass-save.dto";
import {ItemclassEntity} from "../../../entities/arazan-db/items/itemclass.entity";
import {ItemsclassFindDto} from "./DTO/Itemsclass-find.dto";
import {ItemtrackingEntity} from "../../../entities/arazan-db/items/itemtracking.entity";
import {IsOptional, IsString} from "class-validator";
import {ItemsValidityDto} from "./DTO/Items-validity.dto";
import {MasterdataService} from "../masterdata/masterdata.service";
import {VariantsValidityDto} from "./DTO/Variants-validity.dto";
import {ItemsVariantValidityDto} from "./DTO/items-variant-validity.dto";

@Injectable({})
export class ItemsService {
  constructor(
    @InjectRepository(UnitsEntity)
    private readonly unitRepository: Repository<UnitsEntity>,
    @InjectRepository(ItemsEntity)
    private readonly itemRepository: Repository<ItemsEntity>,
    @InjectRepository(PricemodelEntity)
    private readonly pricemodelRepository: Repository<PricemodelEntity>,
    @InjectRepository(UomconversionEntity)
    private readonly uomconversionRepository: Repository<UomconversionEntity>,
    @InjectRepository(UomconversionvariantEntity)
    private readonly uomconversionvariantRepository: Repository<UomconversionvariantEntity>,
    @InjectRepository(UomclassicconversionEntity)
    private readonly uomclassicconversionRepository: Repository<UomclassicconversionEntity>,
    @InjectRepository(VariantsEntity)
    private readonly variantRepository: Repository<VariantsEntity>,
    @InjectRepository(ItemclassEntity)
    private readonly itemclassRepository: Repository<ItemclassEntity>,
    @InjectRepository(ItemtrackingEntity)
    private readonly itemtrackingRepository: Repository<ItemtrackingEntity>,
    private parametreService: ParametresService,
    private categoriesService: CategoriesService,
    private masterdataService: MasterdataService,
  ) {}

  // --------------------------------- Unité
  async createUnit(unitDto: UnitCreateDto) {
    const unit = await this.unitRepository.create(unitDto); // transform the DTO to the entity user
    return await this.unitRepository
      .save(unit)
      .then(async (res) => {
        return await this.unitRepository.findOneBy(unitDto);
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async lookForUnit(unitDto: UnitFindDto) {
    return await this.unitRepository
      .find({
        where: [
          {
            refcompany: unitDto.refcompany,
            refunit: unitDto?.refunit || undefined,
            unit: unitDto?.unit || undefined,
          },
        ],
        order: { refunit: 'ASC' },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async showUnit(unitDto: UnitShowDto) {
    return await this.unitRepository
      .findOneBy({ refcompany: unitDto.refcompany, refunit: unitDto.refunit })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query });
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
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
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
        order: { refpricemodel: 'ASC' },
        select: { refpricemodel: true, pricemodel: true, actif: true, refcompany: true },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async showPriceModel(pricemodelDto: PriceModelShowDto) {
    return await this.pricemodelRepository
      .findOneBy({ refcompany: pricemodelDto.refcompany, refpricemodel: pricemodelDto.refpricemodel })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query });
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
        order: { refpricemodel: 'ASC' },
        select: { refpricemodel: true, pricemodel: true, actif: true, refcompany: true },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  // --------------------------------- Item management
  async lookForItem(itemfinddto: ItemsFindDto) {
    return await this.itemRepository
      .find({
        where: [
          {refitem: itemfinddto?.refitem  || undefined},
          {refcompany: itemfinddto.refcompany},
          {item: itemfinddto?.item || undefined},
          {searchname: itemfinddto?.searchname || undefined},
          {barcode: itemfinddto?.barcode || undefined},
          {itemdescription: itemfinddto?.itemdescription || undefined},
        ],
        relations: {
          pricemodel: true,
          headerparametre: true,
          unitorder: true,
          unitpurch: true,
          unitsales: true,
          unitinvent: true,
          company: true,
        },
        order: { refitem: 'ASC' },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async findItem(itemfinddto: ItemsFindDto) {
    const query = await this.itemRepository
        .createQueryBuilder('item')
        .leftJoinAndSelect(
            'item.pricemodel',
            'pricemodel',
        )
        .leftJoinAndSelect(
            'item.headerparametre',
            'headerparametre',
        )
        .leftJoinAndSelect(
            'item.unitorder',
            'unit unitorder',
        )
        .leftJoinAndSelect(
            'item.unitpurch',
            'unit unitpurch',
        )
        .leftJoinAndSelect(
            'item.unitsales',
            'unit unitsales',
        )
        .leftJoinAndSelect(
            'item.unitinvent',
            'unit unitinvent',
        )
        .leftJoinAndSelect(
            'item.company',
            'company',
        )
        .leftJoinAndSelect(
            'item.itemtracking',
            'itemtracking',
        )
        .leftJoinAndSelect(
            'item.taxesales',
            'taxe taxesales',
        )
        .leftJoinAndSelect(
            'item.taxepurchase',
            'taxe taxepurchase',
        )
        .where('item.refcompany = :refcompany', {refcompany: itemfinddto.refcompany})
        if(![undefined, null, ''].includes(itemfinddto.refitem)) {
            query.andWhere('item.refitem = :refitem', {refitem: itemfinddto.refitem})
        }

        return await query.orderBy('item.refitem', 'DESC')
            .getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
  }

  async saveItem(itemdto: ItemsSaveDto) {
    const idheaderparametre = await this.parametreService.checkaxesbycompany(itemdto.parametres, itemdto.refcompany, 'ANALYTIC');
    itemdto['idheaderparametre'] = Number(idheaderparametre);
    const item = await this.itemRepository.create(itemdto);
    return await this.itemRepository
      .save(item)
      .then(async (res) => {
        await this.categoriesService.affectationItemCategories(itemdto.categories, itemdto.refcompany, itemdto.refitem)
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  // --------------------------------- UOM Conversion Management VARIANT
  async createUomConversionVariant(uomconversionvariantDto: UomConversionVariantCreateDto) {
    const uomconversionvariant = await this.uomconversionvariantRepository.create(uomconversionvariantDto); // transform the DTO to the entity user
    return await this.uomconversionvariantRepository
      .save(uomconversionvariant)
      .then(async (res) => {
        return await this.uomconversionvariantRepository.findOneBy(uomconversionvariantDto);
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async lookForUomconversionVariant(uomconversionvariantfinddto: UomConversionVariantFindDto) {
    return await this.uomconversionvariantRepository
      .find({
        where: {
          refcompany: uomconversionvariantfinddto.refcompany,
          id: uomconversionvariantfinddto?.id || undefined,
        },
        relations: {
          company: true,
          unitfrom: true,
          unitto: true,
          variant: true
        },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  // --------------------------------- UOM Conversion Management
  async createUomConversion(uomconversionDto: UomConversionCreateDto) {
    const uomconversion = await this.uomconversionRepository.create(uomconversionDto); // transform the DTO to the entity user
    return await this.uomconversionRepository
      .save(uomconversion)
      .then(async (res) => {
        return await this.uomconversionRepository.findOneBy(uomconversionDto);
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async lookForUomconversion(uomconversionfinddto: UomConversionFindDto) {
    return await this.uomconversionRepository
      .createQueryBuilder('uomconversion')
      .innerJoinAndSelect('uomconversion.unitfrom', 'units f')
      .innerJoinAndSelect('uomconversion.unitto', 'units t')
      .where('uomconversion.refcompany = :refcompany', { refcompany: uomconversionfinddto.refcompany })
      .getMany()
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async createUomInterneConversion(uomconversionDto: UomInterneConversionCreateDto) {
    const uomconversion = await this.uomclassicconversionRepository.create(uomconversionDto); // transform the DTO to the entity user
    return await this.uomclassicconversionRepository
      .save(uomconversion)
      .then(async (res) => {
        return await this.uomclassicconversionRepository.findOneBy(uomconversionDto);
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async getuomcibycritaria(uomconversionDto: UomInterneConversionFindDto){
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
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }
  // -------------------------------------- Variant Logistique
  async saveVariant(variantdto: VariantSaveDto) {
    const idheaderparametre = await this.parametreService.checkaxesbycompany(variantdto.parametres, variantdto.refcompany, 'ANALYTIC');
    variantdto['idheaderparametre'] = Number(idheaderparametre);
    const idheadervariant = await this.parametreService.checkaxesbycompany(variantdto.variants, variantdto.refcompany, 'VARIANTLOGISTC');
    variantdto['idheadervariant'] = Number(idheadervariant);
    const variant = await this.variantRepository.create(variantdto);
    return await this.variantRepository
      .save(variant)
      .then(async (res) => {
          return await this.itemRepository
              .createQueryBuilder('items')
              .update(ItemsEntity)
              .set({havevariant: true})
              .where('refitem = :refitem', {refitem: variant.refitem})
              .execute()
              .then(async (data) => {
                  return res;
              })
              .catch((err) => {
                  throw new BadRequestException(err.message, {cause: err, description: err.query,});
              })
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async findVariant(variantfinddto: VariantsFindDto) {
    return await this.variantRepository
      .find({
        where: [
          {
            refitem: variantfinddto?.refitem || undefined,
            refvariant: variantfinddto?.refvariant || undefined,
            refcompany: variantfinddto.refcompany,
          },
        ],
        relations: ['company', 'item', 'headerparametre', 'headervariant', 'headervariant.parametreslines', 'taxesales', 'taxepurchase'],
        order: { refitem: 'ASC' },
        select: {},
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  //---------------------------------------------> Item Class
  async saveItemClass(itemclassDto: ItemsclassSaveDto) {
    const countVar = await this.isItemHaveVariant( {refitem: itemclassDto.refitem, refcompany: itemclassDto.refcompany} );
    if ( countVar > 0 && ['', null, undefined].includes(itemclassDto.refvariant) ){
      throw new BadRequestException('Merci de spécifier la variant', { cause: 'Merci de spécifier la variant', description: 'Merci de spécifier la variant',});
    } else {
      let existingItemClass = await this.itemclassRepository.findOneBy({refcompany: itemclassDto.refcompany, refwarehouse: itemclassDto.refwarehouse, refvariant: itemclassDto.refvariant, refitem: itemclassDto.refitem})
      if (existingItemClass) {
        existingItemClass['class'] = itemclassDto.class;
        existingItemClass['actif'] = itemclassDto.actif;
      } else {
        existingItemClass = new ItemclassEntity();
        existingItemClass['refitem'] = itemclassDto.refitem;
        existingItemClass['refwarehouse'] = itemclassDto.refwarehouse;
        existingItemClass['refcompany'] = itemclassDto.refcompany;
        existingItemClass['refvariant'] = itemclassDto.refvariant;
        existingItemClass['actif'] = itemclassDto.actif;
        existingItemClass['class'] = itemclassDto.class;
      }
      const itemclass = await this.itemclassRepository.create(existingItemClass);
      return await this.itemclassRepository
          .save(itemclass)
          .then(async (res) => {
            return res;
          })
          .catch((err) => {
            throw new BadRequestException(err.message, { cause: err, description: err.query,});
          });
    }
  }

  async getItemClass(itemclassDto: ItemsclassFindDto) {
    const query = await this.itemclassRepository.createQueryBuilder('itemclass')
        .innerJoinAndSelect('itemclass.item', 'items')
        .innerJoinAndSelect('itemclass.warehouse', 'warehouse')
        .leftJoinAndSelect('itemclass.variant', 'variants')
        .where('itemclass.refcompany = :refcompany', { refcompany: itemclassDto.refcompany })
        .andWhere('itemclass.refitem = :refitem', { refitem: itemclassDto.refitem })

    if (!['', undefined, null].includes(itemclassDto.refwarehouse)) {
      query.andWhere('itemclass.refwarehouse = :refwarehouse', { refwarehouse: itemclassDto.refwarehouse });
    }
    if (!['', undefined, null].includes(itemclassDto.refvariant)) {
      query.andWhere('itemclass.refvariant = :refvariant', { refvariant: itemclassDto.refvariant })
    }

    return query.getMany()
        .then(async (res) => {
          return res;
        })
        .catch((err) => {
          throw new BadRequestException(err.message, { cause: err, description: err.query,});
        });
  }

  async getItemTracking() {
    return await this.itemtrackingRepository
        .find()
        .then(async (res) => {
          return res;
        })
        .catch((err) => {
          throw new BadRequestException(err.message, { cause: err, description: err.query,});
        });
  }

  async isItemValid(itemDto: ItemsValidityDto, controlObject) {
      return await this.findItem({
          refitem: itemDto.refitem,
          item: undefined,
          refcompany: itemDto.refcompany,
          searchname: undefined,
          barcode: undefined,
          itemdescription: undefined
      })
          .then(async (res) => {
              let message
              if(res.length != 1) {
                  message = 'Item not founded '+itemDto.refitem+' !'

                  throw new BadRequestException(message, { cause: message, description: message,});
              }
              if (controlObject === 'PURCHORDER') {
                  if (res[0].stopedpurch) {
                      message = 'Item '+itemDto.refitem+' bloqué pour achat!'

                      throw new BadRequestException(message, { cause: message, description: message,});
                  }
                  if ([null, undefined].includes(res[0].reftaxepurchase)) {
                      message = 'Taxe achat non affecté à Item '+itemDto.refitem+' !'

                      throw new BadRequestException(message, { cause: message, description: message,});
                  } else {
                      const taxeLineValue = await this.masterdataService.getCurrentTaxeLineValue({refcompany: itemDto.refcompany,reftaxe: res[0].reftaxepurchase, datedebut: undefined})
                      if(taxeLineValue.length != 1) {
                          message = 'Valeur de taxe non paramétrée '+res[0].reftaxepurchase+' !'

                          throw new BadRequestException(message, { cause: message, description: message,});
                      }
                  }
              }
              return res;
          })
          .catch((err) => {
              throw new BadRequestException(err.message, { cause: err, description: err.query,});
          });
  }

  async isVariantValid(variantDto: VariantsValidityDto, controlObject) {
        return await this.findVariant({
            refitem: variantDto.refitem,
            refvariant: variantDto.refvariant,
            refcompany: variantDto.refcompany,
        })
            .then(async (res) => {
                let message;
                if(res.length != 1) {
                    message = 'Variant not founded '+variantDto.refvariant+' !'

                    throw new BadRequestException(message, { cause: message, description: message,});
                }
                if (controlObject === 'PURCHORDER') {
                    if (res[0].stopedpurch) {
                        message = 'Variant bloqué pour achat '+variantDto.refvariant+' !'

                        throw new BadRequestException(message, { cause: message, description: message,});
                    }
                    if (res[0].item.stopedpurch) {
                        message = 'Item '+res[0].item.refitem+' bloqué pour achat!'

                        throw new BadRequestException(message, { cause: message, description: message,});
                    }
                    if ([null, undefined].includes(res[0].reftaxepurchase)) {
                        message = 'Taxe achat non affecté au variant '+variantDto.refvariant+' !'

                        throw new BadRequestException(message, { cause: message, description: message,});
                    } else {
                        const taxeLineValue = await this.masterdataService.getCurrentTaxeLineValue({refcompany: variantDto.refcompany,reftaxe: res[0].reftaxepurchase, datedebut: undefined})
                        if(taxeLineValue.length != 1) {
                            message = 'Valeur de taxe '+res[0].reftaxepurchase+' non paramétrée!'

                            throw new BadRequestException(message, { cause: message, description: message,});
                        }
                    }
                }
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }
  async isItemHaveVariant(itemVariantDto: ItemsVariantValidityDto) {
        return await this.variantRepository
            .countBy({
                refitem: itemVariantDto.refitem,
                refcompany: itemVariantDto.refcompany,
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

}
