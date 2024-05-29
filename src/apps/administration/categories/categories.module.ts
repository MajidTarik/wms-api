import {Module} from '@nestjs/common';
import {CategoriesController} from './categories.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CategoriesService} from './categories.service';
import {ParametresModule} from "../parametres/parametres.module";
import {CategoriesgroupEntity} from "../../../entities/arazan-db/categories/categoriesgroup.entity";
import {CategoriesEntity} from "../../../entities/arazan-db/categories/categories.entity";
import {CategoriesvendorsEntity} from "../../../entities/arazan-db/categories/categoriesvendors.entity";
import {CategoriesitemsEntity} from "../../../entities/arazan-db/categories/categoriesitems.entity";
import {MasterdataModule} from "../masterdata/masterdata.module";

@Module({
    controllers: [
        CategoriesController,
    ],
    imports: [
        TypeOrmModule.forFeature([
            CategoriesgroupEntity,
            CategoriesEntity,
            CategoriesvendorsEntity,
            CategoriesitemsEntity,
        ]),
        ParametresModule,
        MasterdataModule,
    ],
    providers: [CategoriesService],
    exports: [CategoriesService],
})
export class CategoriesModule {
}
