import { Module } from '@nestjs/common';
import { WhCartographyController } from './wh-cartography.controller';
import { WhCartographyService } from './wh-cartography.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '../../../entities/arazan-db/cartography/company.entity';
import { SitegeographyEntity } from '../../../entities/arazan-db/cartography/sitegeography.entity';
import { ParametresModule } from "../parametres/parametres.module";
import { WarehouseEntity } from "../../../entities/arazan-db/cartography/warehouse.entity";
import { AreaEntity } from "../../../entities/arazan-db/cartography/area.entity";
import { ItemsModule } from "../items/items.module";
import { UserEntity } from "../../../entities/arazan-db/users/user.entity";
import { UserCompaniesEntity } from "../../../entities/arazan-db/users/user-companies.entity";
import { CategoriesModule } from "../categories/categories.module";
import { CategoriesaffectationsEntity } from "../../../entities/arazan-db/categories/categoriesaffectations.entity";
import { FurnituretypeEntity } from "../../../entities/arazan-db/cartography/furnituretype.entity";
import { AisleEntity } from "../../../entities/arazan-db/cartography/aisle.entity";
import { LocationEntity } from "../../../entities/arazan-db/cartography/location.entity";

@Module({
  controllers: [WhCartographyController],
  providers: [WhCartographyService],
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      SitegeographyEntity,
      WarehouseEntity,
      AreaEntity,
      UserEntity,
      UserCompaniesEntity,
      CategoriesaffectationsEntity,
      FurnituretypeEntity,
      AisleEntity,
      LocationEntity,
    ]),
    ParametresModule,
    ItemsModule,
    CategoriesModule,
  ],
})
export class WhCartographyModule {
}
