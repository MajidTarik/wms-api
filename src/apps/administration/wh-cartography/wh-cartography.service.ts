import { BadRequestException, Injectable } from '@nestjs/common';
import { CompanyCreateDto } from './DTO/company-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CompanyEntity } from '../../../entities/arazan-db/cartography/company.entity';
import { CompanyFindDto } from './DTO/company-find.dto';
import { SitegeographicFindDto } from "./DTO/sitegeographic-find.dto";
import { SitegeographicCreateDto } from "./DTO/sitegeographic-create.dto";
import { SitegeographyEntity } from "../../../entities/arazan-db/cartography/sitegeography.entity";
import { SitegeographicShowDto } from "./DTO/sitegeographic-show.dto";
import { ParametresService } from "../parametres/parametres.service";
import { WarehouseFindDto } from "./DTO/warehouse-find.dto";
import { WarehouseCreateDto } from "./DTO/warehouse-create.dto";
import { WarehouseShowDto } from "./DTO/warehouse-show.dto";
import { WarehouseEntity } from "../../../entities/arazan-db/cartography/warehouse.entity";
import { AreaFindDto } from "./DTO/area-find.dto";
import { AreaCreateDto } from "./DTO/area-create.dto";
import { AreaShowDto } from "./DTO/area-show.dto";
import { AreaEntity } from "../../../entities/arazan-db/cartography/area.entity";

@Injectable()
export class WhCartographyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(SitegeographyEntity)
    private readonly sitegeographicRepository: Repository<SitegeographyEntity>,
    @InjectRepository(WarehouseEntity)
    private readonly warehouseRepository: Repository<WarehouseEntity>,
    @InjectRepository(AreaEntity)
    private readonly areaRepository: Repository<AreaEntity>,
    private parametreService: ParametresService,
  ) {}

  // ----------------------------------> Company Management
  async createCompany(companyDto: CompanyCreateDto) {
    const company = await this.companyRepository.create(companyDto); // transform the DTO to the entity user
    //return company;
    return await this.companyRepository
      .save(company)
      .then(async (res) => {
        return await this.companyRepository.findOneBy(companyDto);
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async findCompanyByCriteria(companyDto: CompanyFindDto) {
    return await this.companyRepository
      .find({
        where: [
          {
            refcompany: Like(companyDto.refcompany),
            company: Like(companyDto.company),
          },
        ],
        order: { refcompany: 'ASC' },
        select: { refcompany: true, company: true, actif: true },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async lookForCompany(companyDto: CompanyFindDto) {
    return await this.companyRepository
      .find({
        where: [
          { refcompany: Like(companyDto.refcompany) },
          { company: Like(companyDto.company) },
        ],
        order: { refcompany: 'ASC' },
        select: { refcompany: true, company: true, actif: true },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async showCompany(companydto) {
    return await this.companyRepository
      .findOneBy({ refcompany: companydto.refcompany })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async deleteCompany(companydto) {
    return await this.companyRepository
      .findOneBy({ refcompany: companydto.refcompany })
      .then(async (res) => {
        if ([undefined, null].includes(res)) {
          throw new BadRequestException(`Objet introuvable ${companydto.refcompany}.`, { cause: {}, description: `Objet introuvable ${companydto.refcompany}.`,});
        } else {
          return await this.companyRepository
            .remove(res)
            .then((succes) => {
              return succes;
            })
            .catch((err) => {
              throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
        }
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  // ----------------------------------> site geographic Management
  async findSiteByCriteria(sitegeographicDto: SitegeographicFindDto) {
    return await this.sitegeographicRepository
      .find({
        where: [
          {
            refsitegeographic: Like(sitegeographicDto.refsitegeographic),
            sitegeographic: Like(sitegeographicDto.sitegeographic),
            refcompany: Like(sitegeographicDto.refcompany) },
        ],
        order: { refsitegeographic: 'ASC' },
        select: { sitegeographic: true, refsitegeographic: true, actif: true, refcompany: true },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async lookForSitegeographic(sitegeographicDto: SitegeographicFindDto) {
    return await this.sitegeographicRepository
      .find({
        where: [
          { refsitegeographic: Like(sitegeographicDto.refsitegeographic) },
          { sitegeographic: Like(sitegeographicDto.sitegeographic) },
          { refcompany: Like(sitegeographicDto.refcompany) },
        ],
        order: { refsitegeographic: 'ASC' },
        select: { sitegeographic: true, refsitegeographic: true, actif: true, refcompany: true },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async createSitegeographic(sitegeographicDto: SitegeographicCreateDto) {
    const idheaderparametre = await this.parametreService.checkaxesbycompany( sitegeographicDto.parametres, sitegeographicDto.refcompany, sitegeographicDto.reftypeparametre )
    //parametreListe: object, refcompany: string, reftypeparametre: string
    sitegeographicDto['idheaderparametre'] = Number(idheaderparametre);
    const sitegeographic = await this.sitegeographicRepository.create(sitegeographicDto);
    return await this.sitegeographicRepository
      .save(sitegeographic)
      .then(async (res) => {
        return await this.sitegeographicRepository.findOneBy(sitegeographic);
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async showSitegeographic(sitegeographicDto: SitegeographicShowDto) {
    return await this.sitegeographicRepository
      .findOneBy({ refcompany: sitegeographicDto.refcompany, refsitegeographic: sitegeographicDto.refsitegeographic })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  // ----------------------------------> warehouse Management
  async findWarehouseByCriteria(warehouseDto: WarehouseFindDto) {
    return await this.warehouseRepository
      .find({
        where: [
          {
            refwarehouse: Like(warehouseDto.refwarehouse),
            warehouse: Like(warehouseDto.warehouse),
            refcompany: Like(warehouseDto.refcompany)
          },
        ],
        order: { refwarehouse: 'ASC' },
        select: { refwarehouse: true, warehouse: true, actif: true, refcompany: true, refsitegeographic: true },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async lookForWarehouse(warehouseDto: WarehouseFindDto) {
    return await this.warehouseRepository
      .find({
        where: [
          { refwarehouse: Like(warehouseDto.refwarehouse) },
          { warehouse: Like(warehouseDto.warehouse) },
          { refcompany: Like(warehouseDto.refcompany) },
        ],
        order: { refsitegeographic: 'ASC' },
        select: { refwarehouse: true, warehouse: true, actif: true, refcompany: true, refsitegeographic: true },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async createWarehouse(warehouseDto: WarehouseCreateDto) {
    const idheaderparametre = await this.parametreService.checkaxesbycompany( warehouseDto.parametres, warehouseDto.refcompany, warehouseDto.reftypeparametre )
    warehouseDto['idheaderparametre'] = Number(idheaderparametre);
    const warehouse = await this.warehouseRepository.create(warehouseDto);
    return await this.warehouseRepository
      .save(warehouse)
      .then(async (res) => {
        return await this.warehouseRepository.findOneBy(warehouse);
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async showWarehouse(warehouseDto: WarehouseShowDto) {
    return await this.warehouseRepository
      .findOne({
        where: {
            refcompany: warehouseDto.refcompany,
            refwarehouse: warehouseDto.refwarehouse
          },
        relations: {
          sitegeographic: true,
        }
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  // ----------------------------------> area Management
  async findAreaByCriteria(areaDto: AreaFindDto) {
    return await this.areaRepository
      .find({
        where: [
          {
            refarea: Like(areaDto.refarea),
            area: Like(areaDto.area),
            refcompany: Like(areaDto.refcompany),
          },
        ],
        order: { refarea: 'ASC' },
        select: { refarea: true, area: true, actif: true, refcompany: true, refwarehouse: true },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async lookForArea(areaDto: AreaFindDto) {
    return await this.areaRepository
      .find({
        where: [
          { refarea: Like(areaDto.refarea) },
          { area: Like(areaDto.area) },
          { refcompany: Like(areaDto.refcompany) },
        ],
        order: { refarea: 'ASC' },
        select: { refwarehouse: true, area: true, actif: true, refcompany: true, refarea: true },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async createArea(areaDto: AreaCreateDto) {
    const idheaderparametre = await this.parametreService.checkaxesbycompany( areaDto.parametres, areaDto.refcompany, areaDto.reftypeparametre );
    areaDto['idheaderparametre'] = Number(idheaderparametre);
    const area = await this.areaRepository.create(areaDto);
    return await this.areaRepository
      .save(area)
      .then(async (res) => {
        return await this.areaRepository.findOneBy(area);
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async showArea(areaDto: AreaShowDto) {
    console.log(areaDto)
    return await this.areaRepository
      .findOne({
        where: { refcompany: areaDto.refcompany, refarea: areaDto.refarea },
        relations: {warehouse: true}
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }
}
