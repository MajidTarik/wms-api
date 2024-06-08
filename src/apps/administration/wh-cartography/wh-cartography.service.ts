import {BadRequestException, Body, Injectable} from '@nestjs/common';
import {CompanyCreateDto} from './DTO/company-create.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Column, JoinColumn, Like, ManyToOne, Repository} from 'typeorm';
import {CompanyEntity} from '../../../entities/arazan-db/cartography/company.entity';
import {CompanyFindDto} from './DTO/company-find.dto';
import {SitegeographicFindDto} from "./DTO/sitegeographic-find.dto";
import {SitegeographicCreateDto} from "./DTO/sitegeographic-create.dto";
import {SitegeographyEntity} from "../../../entities/arazan-db/cartography/sitegeography.entity";
import {SitegeographicShowDto} from "./DTO/sitegeographic-show.dto";
import {ParametresService} from "../parametres/parametres.service";
import {WarehouseFindDto} from "./DTO/warehouse-find.dto";
import {WarehouseCreateDto} from "./DTO/warehouse-create.dto";
import {WarehouseShowDto} from "./DTO/warehouse-show.dto";
import {WarehouseEntity} from "../../../entities/arazan-db/cartography/warehouse.entity";
import {AreaFindDto} from "./DTO/area-find.dto";
import {AreaCreateDto} from "./DTO/area-create.dto";
import {AreaShowDto} from "./DTO/area-show.dto";
import {AreaEntity} from "../../../entities/arazan-db/cartography/area.entity";
import {AisleFindDto} from "./DTO/aisle-find.dto";
import {AisleEntity} from "../../../entities/arazan-db/cartography/aisle.entity";
import {AisleSaveDto} from "./DTO/aisle-save.dto";
import {FurnituretypeEntity} from "../../../entities/arazan-db/cartography/furnituretype.entity";
import {LocationEntity} from "../../../entities/arazan-db/cartography/location.entity";
import {LocationFindDto} from "./DTO/location-find.dto";
import {LocationSaveDto} from "./DTO/location-save.dto";
import {HelpersProvider} from "../../../helpers/providers/helpers.provider";
import {AddressTypeEntity} from "../../../entities/arazan-db/cartography/address-type.entity";
import {CountryEntity} from "../../../entities/arazan-db/cartography/country.entity";
import {CityFindDto} from "./DTO/city-find.dto";
import {CityEntity} from "../../../entities/arazan-db/cartography/city.entity";
import {AddressSaveDto} from "./DTO/address-save.dto";
import {AddressEntity} from "../../../entities/arazan-db/cartography/address.entity";
import {AddressFindDto} from "./DTO/address-find.dto";
import {MasterdataService} from "../masterdata/masterdata.service";
import {AddressAffectedFindDto} from "./DTO/address-affected-find.dto";
import {AddressAttachSaveDto} from "./DTO/address-attach-save.dto";
import {AddressSitegeographicsEntity} from "../../../entities/arazan-db/cartography/address-sitegeographics.entity";
import {AddressWarehousesEntity} from "../../../entities/arazan-db/cartography/address-warehouses.entity";
import {hash} from "typeorm/util/StringUtils";
import {AddressVendorsEntity} from "../../../entities/arazan-db/cartography/address-vendors.entity";

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
        @InjectRepository(AddressTypeEntity)
        private readonly addresstypeRepository: Repository<AddressTypeEntity>,
        @InjectRepository(CountryEntity)
        private readonly countryRepository: Repository<CountryEntity>,
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,

        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,

        @InjectRepository(AddressSitegeographicsEntity)
        private readonly addressSitegeographicsRepository: Repository<AddressSitegeographicsEntity>,

        @InjectRepository(AddressWarehousesEntity)
        private readonly addressWarehouseRepository: Repository<AddressWarehousesEntity>,

        @InjectRepository(AddressVendorsEntity)
        private readonly addressVendorRepository: Repository<AddressVendorsEntity>,

        private parametreService: ParametresService,

        private masterdataService: MasterdataService,

        private helpersProvider: HelpersProvider,
    ) {
    }

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
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async findCompanyByCriteria(companyDto: CompanyFindDto) {
        return await this.companyRepository
            .find({
                where: [
                    {
                        refcompany: companyDto?.refcompany || Like('%'),
                        company: companyDto?.company || undefined,
                        reforganisation: companyDto.reforganisation,
                    },
                ],
                order: {refcompany: 'ASC'},
                select: {refcompany: true, company: true, actif: true},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async lookForCompany(companyDto: CompanyFindDto) {
        return await this.companyRepository
            .find({
                where: [
                    {
                        refcompany: companyDto?.refcompany || Like('%'),
                        company: companyDto?.company || undefined,
                        reforganisation: companyDto.reforganisation,
                    },
                ],
                order: {refcompany: 'ASC'},
                select: {refcompany: true, company: true, actif: true},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async showCompany(companydto) {
        return await this.companyRepository
            .findOne({
                where: {
                    refcompany: companydto.refcompany,
                    reforganisation: companydto.reforganisation,
                },
                relations: {
                    currency: true,
                }
            })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async deleteCompany(companydto) {
        return await this.companyRepository
            .findOneBy({
                refcompany: companydto.refcompany,
                reforganisation: companydto.reforganisation
            })
            .then(async (res) => {
                if ([undefined, null].includes(res)) {
                    throw new BadRequestException(`Objet introuvable ${companydto.refcompany}.`, {
                        cause: {},
                        description: `Objet introuvable ${companydto.refcompany}.`,
                    });
                } else {
                    return await this.companyRepository
                        .remove(res)
                        .then((succes) => {
                            return succes;
                        })
                        .catch((err) => {
                            throw new BadRequestException(err.message, {cause: err, description: err.query,});
                        });
                }
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
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
                        reforganisation: sitegeographicDto.reforganisation,
                    },
                ],
                order: {refsitegeographic: 'ASC'},
                select: {sitegeographic: true, refsitegeographic: true, actif: true, refcompany: true},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async createSitegeographic(sitegeographicDto: SitegeographicCreateDto) {
        if (!this.helpersProvider.isEmptyObject(sitegeographicDto.parametres)) {
            const idheaderparametre = await this.parametreService.checkaxesbycompany(sitegeographicDto.reforganisation, sitegeographicDto.parametres, sitegeographicDto.refcompany, 'ANALYTIC')
            sitegeographicDto['idheaderparametre'] = Number(idheaderparametre);
        }
        const sitegeographic = await this.sitegeographicRepository.create(sitegeographicDto);
        return await this.sitegeographicRepository
            .save(sitegeographic)
            .then(async (res) => {
                return await this.sitegeographicRepository.findOneBy({
                    refcompany: sitegeographic.refcompany,
                    refsitegeographic: sitegeographic.refsitegeographic
                });
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async showSitegeographic(sitegeographicDto: SitegeographicShowDto) {
        return await this.sitegeographicRepository
            .findOneBy({
                refcompany: sitegeographicDto.refcompany,
                reforganisation: sitegeographicDto.reforganisation,
                refsitegeographic: sitegeographicDto.refsitegeographic
            })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
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
                        refsitegeographic: warehouseDto?.refsitegeographic || undefined,
                        refcompany: warehouseDto.refcompany,
                        reforganisation: warehouseDto.reforganisation,
                    },
                ],
                order: {refwarehouse: 'ASC'},
                select: {refwarehouse: true, warehouse: true, actif: true, refcompany: true, refsitegeographic: true},
            })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async createWarehouse(warehouseDto: WarehouseCreateDto) {
        if (!this.helpersProvider.isEmptyObject(warehouseDto.parametres)) {
            const idheaderparametre = await this.parametreService.checkaxesbycompany(warehouseDto.reforganisation, warehouseDto.parametres, warehouseDto.refcompany, 'ANALYTIC')
            warehouseDto['idheaderparametre'] = Number(idheaderparametre);
        }

        const warehouse = await this.warehouseRepository.create(warehouseDto);
        return await this.warehouseRepository
            .save(warehouse)
            .then(async (res) => {
                return await this.warehouseRepository.findOneBy({
                    refcompany: warehouse.refcompany,
                    reforganisation: warehouse.reforganisation,
                    refwarehouse: warehouse.refwarehouse,
                    refsitegeographic: warehouse.refsitegeographic
                });
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async showWarehouse(warehouseDto: WarehouseShowDto) {
        return await this.warehouseRepository
            .findOne({
                where: {
                    refcompany: warehouseDto.refcompany,
                    refwarehouse: warehouseDto?.refwarehouse || undefined,
                    reforganisation: warehouseDto.reforganisation,
                },
                relations: [
                    'sitegeographic',
                    'defaultexpeditionlocation.aisle.area',
                    'defaultreceivelocation.aisle.area',
                    'defaultgoodsfabricationlocation.aisle.area',
                    'defaultrawmaterialconsumptionlocation.aisle.area',
                    'defaultreturnlocation.aisle.area',
                ]
            })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
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
                        reforganisation: areaDto.reforganisation,
                        refwarehouse: areaDto?.refwarehouse || undefined,
                    },
                ],
                order: {refarea: 'ASC'},
                select: {refarea: true, area: true, actif: true, refcompany: true, refwarehouse: true},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
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
                        reforganisation: areaDto.reforganisation,
                    },
                ],
                order: {refarea: 'ASC'},
                select: {refwarehouse: true, area: true, actif: true, refcompany: true, refarea: true},
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async createArea(areaDto: AreaCreateDto) {
        const area = await this.areaRepository.create(areaDto);
        if ([undefined, null, ''].includes(areaDto.refarea)) {
            area.refarea = await this.masterdataService.generatepk('AE');
        }
        return await this.areaRepository
            .save(area)
            .then(async (res) => {
                return await this.areaRepository.findOneBy({refcompany: area.refcompany, refarea: area.refarea});
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async showArea(areaDto: AreaShowDto) {
        return await this.areaRepository
            .findOne({
                where: {
                    refcompany: areaDto.refcompany,
                    refarea: areaDto.refarea,
                    reforganisation: areaDto.reforganisation,
                },
                relations: {warehouse: true}
            })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
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
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async findAisle(aisleDto: AisleFindDto) {
        const queryBuilder = this.aisleRepository
            .createQueryBuilder('aisle')
            .innerJoinAndSelect('aisle.furnituretype', 'furnituretype')
            .innerJoinAndSelect('aisle.area', 'area')
            .innerJoinAndSelect('area.warehouse', 'warehouse')
            .where('aisle.refcompany = :refcompany and aisle.reforganisation = :reforganisation', {
                refcompany: aisleDto.refcompany,
                reforganisation: aisleDto.reforganisation,
            })
        if (aisleDto?.refarea) {
            queryBuilder.andWhere('aisle.refarea = :refarea', {refarea: aisleDto?.refarea || undefined})
        }

        if (aisleDto?.refaisle) {
            queryBuilder.andWhere('aisle.refaisle = :refaisle', {refaisle: aisleDto?.refaisle || undefined})
        }

        return await queryBuilder.getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async saveAisle(aisleDto: AisleSaveDto) {
        // Array that hold the generated locations depending to defined X, Y and Z
        let locations = [];
        // Verify that X, Y and Z are > 0
        if ((aisleDto.xshelf > 0) && (aisleDto.yfloor > 0) && (aisleDto.zsection > 0)) {
            // Check if the aisle is all ready exist in data base.
            const existingAisle = await this.aisleRepository.findOneBy({
                refaisle: aisleDto.refaisle,
                refcompany: aisleDto.refcompany,
                reforganisation: aisleDto.reforganisation,
            })
            if (!existingAisle || [undefined, null, ''].includes(aisleDto.refaisle)) {
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
                    throw new BadRequestException('Veulliez verifier les nouvelles valeur des axes!', {
                        cause: 'Veulliez verifier les nouvelles valeur des axes!',
                        description: 'Veulliez verifier les nouvelles valeur des axes!',
                    });
                } else if ((aisleDto.xshelf > existingAisle.xshelf || aisleDto.yfloor > existingAisle.yfloor) && (aisleDto.zsection == existingAisle.zsection)) {
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
                ) {
                    throw new BadRequestException('Certaine données ne peuvent pas être modifiable !', {
                        cause: 'Certaine données ne peuvent pas être modifiable !',
                        description: 'Certaine données ne peuvent pas être modifiable !',
                    });
                }
            }
        } else {
            throw new BadRequestException('Veulliez verifier l\'axe X, Y ou Z', {
                cause: 'Veulliez verifier l\'axe X, Y ou Z',
                description: 'Veulliez verifier l\'axe X, Y ou Z',
            });
        }
        // If all is well, save the aisle entity
        const aisle = await this.aisleRepository.create(aisleDto);
        if ([undefined, null, ''].includes(aisleDto.refaisle)) {
            aisle.refaisle = await this.masterdataService.generatepk('AL');
        }

        return await this.aisleRepository
            .save(aisle)
            .then(async (res) => {
                // Save the locations if existed.
                await locations.forEach(location => {
                    location.refaisle = res.refaisle;
                    location.refcompany = res.refcompany;
                    location.reforganisation = res.reforganisation;
                });
                return await this.locationRepository.save(locations)
                    .then(async (res) => {
                            return await this.aisleRepository.findOneBy({
                                refcompany: aisle.refcompany,
                                reforganisation: aisle.reforganisation,
                                refaisle: aisle.refaisle,
                                refarea: aisle.refarea
                            });
                        }
                    )
                    .catch((err) => {
                        throw new BadRequestException(err.message, {cause: err, description: err.query,});
                    })
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async createLocationFromAxes(prefix: string, separator: string, oldX: number, X: number, oldY: number, Y: number, oldZ: number, Z: number, existingLocations: boolean) {
        const array: {
            reflocation: string,
            shelf: number,
            floor: number,
            section: number,
        }[] = [];

        if (existingLocations) {
            if (X > oldX) {
                for (let i = (oldX + 1); i <= X; i++) {
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
            }
            if (Y > oldY) {
                for (let i = 1; i <= X; i++) {
                    for (let j = (oldY + 1); j <= Y; j++) {
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
            .innerJoinAndSelect('aisle.area', 'area')
            .where('location.refcompany = :refcompany', {refcompany: locationDto.refcompany})
            .andWhere('location.refaisle = :refaisle', {refaisle: locationDto.refaisle})
            .andWhere('location.reforganisation = :reforganisation', {reforganisation: locationDto.reforganisation})

        if (![undefined, null, ''].includes(locationDto.reflocation)) {
            queryBuilder.andWhere('location.reflocation = :reflocation', {reflocation: locationDto.reflocation})
        }

        return await queryBuilder.getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async saveLocation(locationDto: LocationSaveDto) {
        return await this.locationRepository.findOne({
            where: {
                reflocation: locationDto.reflocation,
                refcompany: locationDto.refcompany,
                refaisle: locationDto.refaisle,
                reforganisation: locationDto.reforganisation,
            }
        })
            .then(async (locationLigne) => {
                if (locationLigne) {
                    const location = await this.locationRepository.create(locationDto)
                    return await this.locationRepository.save(location)
                        .then(async (res) => {
                                const updatedLocation = await this.getLocationsByAisle({
                                    reflocation: res.reflocation,
                                    refcompany: res.refcompany,
                                    refaisle: res.refaisle,
                                    reforganisation: res.reforganisation,
                                });
                                return updatedLocation[0]
                            }
                        )
                        .catch((err) => {
                            throw new BadRequestException(err.message, {cause: err, description: err.query,});
                        })
                } else {
                    throw new BadRequestException('Location introuvable', {
                        cause: 'Location introuvable',
                        description: 'Location introuvable',
                    });
                }
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            })
    }

    async findAddressTypes() {
        return await this.addresstypeRepository
            .find()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async findCountries() {
        return await this.countryRepository
            .find()
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async findCitiesByCountry(cityDto: CityFindDto) {
        return await this.cityRepository
            .findBy({
                refcountry: cityDto.refcountry
            })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async saveAddress(addressDto: AddressSaveDto) {
        if ([undefined, null, ''].includes(addressDto.refaddress))
            addressDto.refaddress = await this.masterdataService.generatepk('ADR');
        const area = await this.addressRepository.create(addressDto);
        return await this.addressRepository
            .save(area)
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async findaddress(addressDto: AddressFindDto) {
        return await this.addressRepository.find({
            where: [{
                refcompany: addressDto.refcompany,
                reforganisation: addressDto.reforganisation,
                refaddress: addressDto?.refaddress || undefined,
            }],
            relations: {city: true, country: true}
        })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getAddressByControlObject(addressaffectedfindDto: AddressAffectedFindDto) {
        const controlobject = await this.masterdataService.findControlobject({
            refcontrolobject : undefined,
            okforaddress: undefined,
            okforgroupcategories: undefined,
            okforworkflows: undefined,
            prefix: addressaffectedfindDto.prefix,
        });

        let buildedQuery;

        if (!controlobject || controlobject.length < 1) {
            throw new BadRequestException('Merci d envoyer au moins un critére valide l\'object contrôler est invalide', {});
        }

        if (!controlobject[0].okforaddress) {
            throw new BadRequestException('object non autoriser pour le contrôle d\'address', {});
        } else {
            if (controlobject[0].prefix === 'ST') {
                buildedQuery = await this.addressSitegeographicsRepository
                    .createQueryBuilder('addresssitegeographics')
                    .innerJoinAndSelect('addresssitegeographics.address', 'address')
                    .innerJoinAndSelect('address.city', 'city')
                    .innerJoinAndSelect('address.country', 'country')
                    .innerJoinAndSelect('addresssitegeographics.addresstype', 'addresstype')
                    .where('addresssitegeographics.refsitegeographic = :refsitegeographic', { refsitegeographic: addressaffectedfindDto.refObject })
            } else if (controlobject[0].prefix === 'WH') {
                buildedQuery = await this.addressWarehouseRepository
                    .createQueryBuilder('addresswarehouses')
                    .innerJoinAndSelect('addresswarehouses.address', 'address')
                    .innerJoinAndSelect('address.city', 'city')
                    .innerJoinAndSelect('address.country', 'country')
                    .innerJoinAndSelect('addresswarehouses.addresstype', 'addresstype')
                    .where('addresswarehouses.refwarehouse = :refwarehouse', { refwarehouse: addressaffectedfindDto.refObject })
            } else if (controlobject[0].prefix === 'VD') {
                buildedQuery = await this.addressVendorRepository
                    .createQueryBuilder('addressvendors')
                    .innerJoinAndSelect('addressvendors.address', 'address')
                    .innerJoinAndSelect('address.city', 'city')
                    .innerJoinAndSelect('address.country', 'country')
                    .innerJoinAndSelect('addressvendors.addresstype', 'addresstype')
                    .where('addressvendors.refvendor = :refvendor', { refvendor: addressaffectedfindDto.refObject })
            } else {
                throw new BadRequestException('l\'object contrôler est introuvable', {});
            }
            return await buildedQuery
                .getMany()
                .then(async (res) => {
                    return res;
                })
                .catch((err) => {
                    throw new BadRequestException(err.message, {cause: err, description: err.query,});
                });
        }
    }

    async attachAddressToObject(addressattachsaveDto: AddressAttachSaveDto) {
        const controlobject = await this.masterdataService.findControlobject({
            prefix :addressattachsaveDto.prefix,
            okforaddress: undefined,
            okforgroupcategories: undefined,
            okforworkflows: undefined,
            refcontrolobject: undefined,
        });

        if (!controlobject || controlobject.length < 1) {
            throw new BadRequestException('Merci d envoyer au moins un critére valide l\'object contrôler est invalide', {});
        }

        if (!controlobject[0].okforaddress) {
            throw new BadRequestException('object non autoriser pour le contrôle d\'address', {});
        } else {
            if (controlobject[0].prefix === 'ST') {
                const addresssitegeographics = await this.addressSitegeographicsRepository.create({
                    refcompany: addressattachsaveDto.refcompany,
                    reforganisation: addressattachsaveDto.reforganisation,
                    refaddresstype: addressattachsaveDto.refaddresstype,
                    refaddress: addressattachsaveDto.refaddress,
                    refsitegeographic: addressattachsaveDto.refObject
                });
                return await this.addressSitegeographicsRepository
                    .save(addresssitegeographics)
                    .then(async (res) => {
                        return res;
                    })
                    .catch((err) => {
                        throw new BadRequestException(err.message, {cause: err, description: err.query,});
                    });
            } else if (controlobject[0].prefix === 'WH') {
                const addresswarehouses = await this.addressWarehouseRepository.create({
                    refcompany: addressattachsaveDto.refcompany,
                    reforganisation: addressattachsaveDto.reforganisation,
                    refaddresstype: addressattachsaveDto.refaddresstype,
                    refaddress: addressattachsaveDto.refaddress,
                    refwarehouse: addressattachsaveDto.refObject
                });
                return await this.addressWarehouseRepository
                    .save(addresswarehouses)
                    .then(async (res) => {
                        return res;
                    })
                    .catch((err) => {
                        throw new BadRequestException(err.message, {cause: err, description: err.query,});
                    });
            } else if (controlobject[0].prefix === 'VD') {
                const addressvendorsreleased = await this.addressVendorRepository.create({
                    refcompany: addressattachsaveDto.refcompany,
                    reforganisation: addressattachsaveDto.reforganisation,
                    refaddresstype: addressattachsaveDto.refaddresstype,
                    refaddress: addressattachsaveDto.refaddress,
                    refvendor: addressattachsaveDto.refObject,
                });
                return await this.addressVendorRepository
                    .save(addressvendorsreleased)
                    .then(async (res) => {
                        return res;
                    })
                    .catch((err) => {
                        throw new BadRequestException(err.message, {cause: err, description: err.query,});
                    });
            } else {
                throw new BadRequestException('l\'object contrôler est introuvable', {});
            }
        }
    }

    async detachedAddressFromObject(addressattachsaveDto: AddressAttachSaveDto) {
        const controlobject = await this.masterdataService.findControlobject({
            refcontrolobject : undefined,
            okforaddress: undefined,
            okforgroupcategories: undefined,
            okforworkflows: undefined,
            prefix: addressattachsaveDto.prefix
        });

        if (!controlobject || controlobject.length < 1) {
            throw new BadRequestException('Merci d envoyer au moins un critére valide l\'object contrôler est invalide', {});
        }

        if (!controlobject[0].okforaddress) {
            throw new BadRequestException('object non autoriser pour le contrôle d\'address', {});
        } else {
            if (controlobject[0].prefix === 'ST') {
                return await this.addressSitegeographicsRepository.findBy({
                    refcompany: addressattachsaveDto.refcompany,
                    reforganisation: addressattachsaveDto.reforganisation,
                    refaddresstype: addressattachsaveDto.refaddresstype,
                    refaddress: addressattachsaveDto.refaddress,
                    refsitegeographic: addressattachsaveDto.refObject
                })
                    .then(async (res) => {
                        return await this.addressSitegeographicsRepository.remove(res)
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
            } else if (controlobject[0].prefix === 'WH') {
                return await this.addressWarehouseRepository.findBy({
                    refcompany: addressattachsaveDto.refcompany,
                    reforganisation: addressattachsaveDto.reforganisation,
                    refaddresstype: addressattachsaveDto.refaddresstype,
                    refaddress: addressattachsaveDto.refaddress,
                    refwarehouse: addressattachsaveDto.refObject
                })
                    .then(async (res) => {
                        return await this.addressWarehouseRepository.remove(res)
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
            } else if (controlobject[0].prefix === 'VD') {
                return await this.addressVendorRepository.findBy({
                    refcompany: addressattachsaveDto.refcompany,
                    reforganisation: addressattachsaveDto.reforganisation,
                    refaddresstype: addressattachsaveDto.refaddresstype,
                    refaddress: addressattachsaveDto.refaddress,
                    refvendor: addressattachsaveDto.refObject
                })
                    .then(async (res) => {
                        return await this.addressVendorRepository.remove(res)
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
            } else {
                throw new BadRequestException('l\'object contrôler est introuvable', {});
            }
        }
    }
}
