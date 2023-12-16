import { BadRequestException, Injectable } from '@nestjs/common';
import { CompanyCreateDto } from './DTO/company-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Column, Like, Repository} from 'typeorm';
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
import {AisleFindDto} from "./DTO/aisle-find.dto";
import {AisleEntity} from "../../../entities/arazan-db/cartography/aisle.entity";
import {AisleSaveDto} from "./DTO/aisle-save.dto";
import {FurnituretypeEntity} from "../../../entities/arazan-db/cartography/furnituretype.entity";
import {Abcclass} from "../../../helpers/abcclass";
import {LocationEntity} from "../../../entities/arazan-db/cartography/location.entity";
import {LocationFindDto} from "./DTO/location-find.dto";
import {LocationSaveDto} from "./DTO/location-save.dto";

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

    @InjectRepository(AisleEntity)
    private readonly aisleRepository: Repository<AisleEntity>,

    @InjectRepository(FurnituretypeEntity)
    private readonly fournituretypeRepository: Repository<FurnituretypeEntity>,

    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,

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
            refcompany: companyDto?.refcompany || Like('%'),
            company: companyDto?.company || undefined,
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
          {
            refcompany: companyDto?.refcompany || Like('%'),
            company: companyDto?.company || undefined,
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
            refsitegeographic: sitegeographicDto?.refsitegeographic || undefined,
            sitegeographic: sitegeographicDto?.sitegeographic || undefined,
            refcompany: sitegeographicDto.refcompany,
          },
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
            refwarehouse: warehouseDto?.refwarehouse || undefined,
            warehouse: warehouseDto?.warehouse || undefined,
            refcompany: warehouseDto.refcompany,
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
          {
            refwarehouse: warehouseDto?.refwarehouse || undefined,
            warehouse: warehouseDto?.warehouse || undefined,
            refcompany: warehouseDto.refcompany,
          },
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
            refwarehouse: warehouseDto?.refwarehouse || undefined,
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
            refarea: areaDto?.refarea || undefined,
            area: areaDto?.area || undefined,
            refcompany: areaDto.refcompany,
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
          {
            refarea: areaDto?.refarea || undefined,
            area: areaDto?.area || undefined,
            refcompany: areaDto.refcompany,
          },
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

    //---------------------------------------------------------- Aisle
    async findFournitureType() {
        return await this.fournituretypeRepository
            .find()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

  async findAisle(aisleDto: AisleFindDto) {
      const queryBuilder = this.aisleRepository
          .createQueryBuilder('aisle')
          .innerJoinAndSelect('aisle.furnituretype', 'furnituretype')
          .innerJoinAndSelect('aisle.area', 'area')
          .innerJoinAndSelect('area.warehouse', 'warehouse')
          .where('aisle.refcompany = :refcompany', { refcompany: aisleDto.refcompany })

      if (aisleDto?.refaisle) {
          queryBuilder.andWhere('aisle.refaisle = :refaisle', { refaisle: aisleDto?.refaisle || undefined})
      }

      return await queryBuilder.getMany()
          .then(async (res) => {
              return res;
          })
          .catch((err) => {
              throw new BadRequestException(err.message, { cause: err, description: err.query,});
          });
    }
    async saveAisle(aisleDto: AisleSaveDto) {
      // Array that hold the generated locations depending to defined X, Y and Z
      let locations = [];
      // Verify that X, Y and Z are > 0
      if((aisleDto.xshelf > 0) && (aisleDto.yfloor > 0) && (aisleDto.zsection > 0)) {
          // Check if the aisle is all ready exist in data base.
          const existingAisle = await this.aisleRepository.findOneBy({refaisle: aisleDto.refaisle})
        if (!existingAisle) {
            // Create all locations from (1,1,1) to (X,Y,Z)
            locations = await this.createLocationFromAxes(
                aisleDto.prefix, aisleDto.separator,
                1, aisleDto.yfloor,
                1, aisleDto.xshelf,
                1, aisleDto.zsection,
                false
            )
        } else {
            // If the aisle is all ready exist check if one of the X and Y is supperior than the existing X, Y in the data base. Also the Z axe must be the same.
            if ((aisleDto.xshelf < existingAisle.xshelf || aisleDto.yfloor < existingAisle.yfloor || aisleDto.zsection != existingAisle.zsection)) {
                throw new BadRequestException('Veulliez verifier l\'axe Z', { cause: 'Veulliez verifier l\'axe Z', description: 'Veulliez verifier l\'axe Z',});
            } else if ((aisleDto.xshelf > existingAisle.xshelf || aisleDto.yfloor > existingAisle.yfloor) && (aisleDto.zsection == existingAisle.zsection)){
                // Create the supplement locations
                locations = await this.createLocationFromAxes(
                    aisleDto.prefix, aisleDto.separator,
                    existingAisle.yfloor, aisleDto.yfloor,
                    existingAisle.xshelf, aisleDto.xshelf,
                    existingAisle.zsection, existingAisle.zsection,
                    true
                )
            }
            // Check the froozen attribut of location are not updated.
            if (
                aisleDto.aisle != existingAisle.aisle
                || aisleDto.separator != existingAisle.separator
                || aisleDto.prefix != existingAisle.prefix
                || aisleDto.refarea != existingAisle.refarea
            ){
                throw new BadRequestException('Certaine données ne peuvent pas être modifiable !', { cause: 'Certaine données ne peuvent pas être modifiable !', description: 'Certaine données ne peuvent pas être modifiable !',});
            }
        }
      } else {
          throw new BadRequestException('Veulliez verifier l\'axe X, Y ou Z', { cause: 'Veulliez verifier l\'axe X, Y ou Z', description: 'Veulliez verifier l\'axe X, Y ou Z',});
      }
      // If all is well, save the aisle entity
      const aisle = await this.aisleRepository.create(aisleDto);
      return await this.aisleRepository
        .save(aisle)
        .then(async (res) => {
            // Save the locations if existed.
            await locations.forEach(location => {
                location.refaisle = res.refaisle;
                location.refcompany = res.refcompany;
            });
            return await this.locationRepository.save(locations)
                .then( async (res) => {
                        return await this.aisleRepository.findOneBy(aisle);
                    }
                )
                .catch((err) => {
                    throw new BadRequestException(err.message, { cause: err, description: err.query,});
                })
        })
        .catch((err) => {
            throw new BadRequestException(err.message, { cause: err, description: err.query,});
        });
  }

   async createLocationFromAxes(prefix: string, separator: string, oldX: number, X: number, oldY: number,  Y: number, oldZ: number, Z: number, existingLocations: boolean) {
       const array: {
           reflocation: string,
           shelf: number,
           floor: number,
           section: number,
       }[] = [];

      if (existingLocations){
          if (X > oldX) {
              for (let i = (oldX+1); i <= X; i++) {
                  for (let j = 1; j <= oldY; j++) {
                      for (let k = 1; k <= Z; k++) {
                          array.push({
                              reflocation: `${prefix}${separator}${i}${separator}${j}${separator}${k}`,
                              shelf: j,
                              floor: i,
                              section: k,
                          });
                      }
                  }
              }
              console.log('X > OLDX', array)
          }
          if (Y > oldY) {
              for (let i = 1; i <= X; i++) {
                  for (let j = (oldY+1); j <= Y; j++) {
                      for (let k = 1; k <= Z; k++) {
                          array.push({
                              reflocation: `${prefix}${separator}${i}${separator}${j}${separator}${k}`,
                              shelf: j,
                              floor: i,
                              section: k,
                          });
                      }
                  }
              }
              console.log('Y > OLDY', array)
          }
      } else {
          for (let i = 1; i <= X; i++) {
              for (let j = 1; j <= Y; j++) {
                  for (let k = 1; k <= Z; k++) {
                      array.push({
                          reflocation: `${prefix}${separator}${i}${separator}${j}${separator}${k}`,
                          shelf: j,
                          floor: i,
                          section: k,
                      });
                  }
              }
          }
      }


        return array;
    }

    async getLocationsByAisle(locationDto: LocationFindDto) {
        const queryBuilder = this.locationRepository
            .createQueryBuilder('location')
            .innerJoinAndSelect('location.aisle', 'aisle')
            .where('location.refcompany = :refcompany', { refcompany: locationDto.refcompany })
            .andWhere('location.refaisle = :refaisle', { refaisle: locationDto.refaisle })

        if (! [undefined, null, ''].includes(locationDto.reflocation)) {
            queryBuilder.andWhere('location.reflocation = :reflocation', { reflocation: locationDto.reflocation })
        }

        return await queryBuilder.getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

   async saveLocation(locationDto: LocationSaveDto) {
      return await this.locationRepository.findOne({
          where: {
              reflocation: locationDto.reflocation,
              refcompany: locationDto.refcompany,
              refaisle: locationDto.refaisle,
          }
      })
          .then(async (locationLigne) => {
              if (locationLigne) {
                  const location = await this.locationRepository.create(locationDto)
                  return await this.locationRepository.save(location)
                      .then( async (res) => {
                              const updatedLocation = await this.getLocationsByAisle({
                                  reflocation: res.reflocation,
                                  refcompany: res.refcompany,
                                  refaisle: res.refaisle
                              });
                              console.log(updatedLocation[0]);
                              return updatedLocation[0]
                          }
                      )
                      .catch((err) => {
                          throw new BadRequestException(err.message, { cause: err, description: err.query,});
                      })
              } else {
                  throw new BadRequestException('Location introuvable', { cause: 'Location introuvable', description: 'Location introuvable',});
              }
          })
          .catch((err) => {
              throw new BadRequestException(err.message, { cause: err, description: err.query,});
          })
   }



}
