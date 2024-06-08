import {Module} from '@nestjs/common';
import {WhCartographyController} from './wh-cartography.controller';
import {WhCartographyService} from './wh-cartography.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CompanyEntity} from '../../../entities/arazan-db/cartography/company.entity';
import {SitegeographyEntity} from '../../../entities/arazan-db/cartography/sitegeography.entity';
import {ParametresModule} from "../parametres/parametres.module";
import {WarehouseEntity} from "../../../entities/arazan-db/cartography/warehouse.entity";
import {AreaEntity} from "../../../entities/arazan-db/cartography/area.entity";
import {ItemsModule} from "../items/items.module";
import {UserEntity} from "../../../entities/arazan-db/users/user.entity";
import {CategoriesModule} from "../categories/categories.module";
import {FurnituretypeEntity} from "../../../entities/arazan-db/cartography/furnituretype.entity";
import {AisleEntity} from "../../../entities/arazan-db/cartography/aisle.entity";
import {LocationEntity} from "../../../entities/arazan-db/cartography/location.entity";
import {HelpersProvider} from "../../../helpers/providers/helpers.provider";
import {AddressEntity} from "../../../entities/arazan-db/cartography/address.entity";
import {AddressTypeEntity} from "../../../entities/arazan-db/cartography/address-type.entity";
import {CityEntity} from "../../../entities/arazan-db/cartography/city.entity";
import {CountryEntity} from "../../../entities/arazan-db/cartography/country.entity";
import {MasterdataModule} from "../masterdata/masterdata.module";
import {AddressWarehousesEntity} from "../../../entities/arazan-db/cartography/address-warehouses.entity";
import {AddressSitegeographicsEntity} from "../../../entities/arazan-db/cartography/address-sitegeographics.entity";
import {OrganisationEntity} from "../../../entities/arazan-db/cartography/organisation.entity";
import {AddressVendorsEntity} from "../../../entities/arazan-db/cartography/address-vendors.entity";

@Module({
    controllers: [WhCartographyController],
    providers: [WhCartographyService, HelpersProvider],
    imports: [
        TypeOrmModule.forFeature([
            CompanyEntity,
            SitegeographyEntity,
            WarehouseEntity,
            AreaEntity,
            UserEntity,
            FurnituretypeEntity,
            AisleEntity,
            LocationEntity,
            AddressEntity,
            AddressTypeEntity,
            CityEntity,
            CountryEntity,
            AddressWarehousesEntity,
            AddressSitegeographicsEntity,
            AddressVendorsEntity,
            OrganisationEntity
        ]),
        ParametresModule,
        ItemsModule,
        MasterdataModule,
        CategoriesModule,
    ],
})
export class WhCartographyModule {
}
