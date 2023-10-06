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
    @InjectRepository(UomclassicconversionEntity)
    private readonly uomclassicconversionRepository: Repository<UomclassicconversionEntity>,
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
          { refunit: Like(unitDto.refunit) },
          { unit: Like(unitDto.unit) },
          { refcompany: Like(unitDto.refcompany) },
        ],
        order: { refunit: 'ASC' },
        select: { refunit: true, unit: true, actif: true, refcompany: true, datetimecreation: true, datetimelastupdate: true },
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

  async findactifunitbycriteria(unitDto: UnitFindDto) {
    const units = await this.unitRepository
      .find({
        where: {
          refcompany: unitDto.refcompany,
          actif: true,
        },
        select: {
          refunit: true,
          unit: true,
        }
      });
    console.log('---================>',units);
    return units;
  }

  async findUnitByCriteria(unitDto: UnitFindDto) {
    console.log(unitDto);
    return await this.unitRepository
      .createQueryBuilder('unit')
      .innerJoinAndSelect(
        'unit.company',
        'company',
        'unit.refcompany = :refcompany',
        {refcompany: unitDto.refcompany}
      )
      .andWhere('unit.refunit = COALESCE(:refunit, unit.refunit)', {refunit: unitDto.refunit})
      .andWhere('unit.unit = COALESCE(:unit, unit.unit)', {unit: unitDto.unit})
      .getMany()
      .then(async (res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
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
          { refpricemodel: Like(pricemodelDto.refpricemodel) },
          { pricemodel: Like(pricemodelDto.pricemodel) },
          { refcompany: Like(pricemodelDto.refcompany) },
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
    console.log('---------------------------------------------');
    return await this.pricemodelRepository
      .find({
        where: [
          {
            refcompany: Like(pricemodelDto.refcompany),
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
          { refitem: Like(itemfinddto.refitem) },
          { item: Like(itemfinddto.item) },
          { refcompany: Like(itemfinddto.refcompany) },
          { searchname: Like(itemfinddto.searchname) },
          { barcode: Like(itemfinddto.barcode) },
          { itemdescription: Like(itemfinddto.itemdescription) },
        ],
        order: { refitem: 'ASC' },
        select: { refitem: true, item: true, searchname: true, barcode: true, itemdescription: true },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async findItem(itemfinddto: ItemsFindDto) {
    return await this.itemRepository
      .find({
        where: [
          {
            refitem: Like(itemfinddto.refitem),
            item: Like(itemfinddto.item),
            refcompany: Like(itemfinddto.refcompany),
            searchname: Like(itemfinddto.searchname),
            barcode: Like(itemfinddto.barcode),
            itemdescription: Like(itemfinddto.itemdescription)
          },
        ],
        order: { refitem: 'ASC' },
        select: { refitem: true, item: true, searchname: true, barcode: true, itemdescription: true },
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
    console.log(uomconversion);
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
    console.log('conversion interne',uomconversion);
    return await this.uomclassicconversionRepository
      .save(uomconversion)
      .then(async (res) => {
        console.log(res);
        return await this.uomclassicconversionRepository.findOneBy(uomconversionDto);
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async getUomInterneConversion(uomconversionDto: UomInterneConversionFindDto) {
    return await this.uomclassicconversionRepository
      .findBy(uomconversionDto)
      .then(async (res) => {
        return res;
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
          refunitfrom: uomconversionDto.refunitfrom,
          refunitto: uomconversionDto.refunitto,
        },
        relations: {
          company: true,
          unitfrom: true,
          unitto: true,
        },
        select: {
          actif: true,
          coefficient: true,
          unitto: {
            refunit: true,
            unit: true,
          },
          unitfrom: {
            refunit: true,
            unit: true,
          },
        }
      })
      .then(async (res) => {
        console.log('HOOOOOO',res[0]);
        return res[0];
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }
}
