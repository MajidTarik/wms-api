import {Module} from '@nestjs/common';
import {ItemsController} from './items.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UnitsEntity} from '../../../entities/arazan-db/items/units.entity';
import {ItemsEntity} from '../../../entities/arazan-db/items/items.entity';
import {UomconversionEntity} from '../../../entities/arazan-db/items/uomconversion.entity';
import {PricemodelEntity} from '../../../entities/arazan-db/items/pricemodel.entity';
import {ItemsService} from './items.service';
import {UomclassicconversionEntity} from "../../../entities/arazan-db/items/uomclassicconversion.entity";
import {ParametresModule} from "../parametres/parametres.module";
import {CategoriesModule} from "../categories/categories.module";
import {ItemtrackingEntity} from "../../../entities/arazan-db/items/itemtracking.entity";
import {ItemclassEntity} from "../../../entities/arazan-db/items/itemclass.entity";
import {MasterdataModule} from "../masterdata/masterdata.module";
import {HelpersProvider} from "../../../helpers/providers/helpers.provider";
import {ItemsreleasedEntity} from "../../../entities/arazan-db/items/itemsreleased.entity";
import {ItemsgroupEntity} from "../../../entities/arazan-db/items/itemsgroup.entity";

@Module({
    controllers: [
        ItemsController,
    ],
    imports: [
        TypeOrmModule.forFeature([
            UnitsEntity,
            ItemsEntity,
            UomconversionEntity,
            UomclassicconversionEntity,
            PricemodelEntity,
            ItemtrackingEntity,
            ItemclassEntity,
            ItemsreleasedEntity,
            ItemsgroupEntity,
        ]),
        ParametresModule,
        CategoriesModule,
        MasterdataModule,
    ],
    providers: [ItemsService, HelpersProvider],
    exports: [ItemsService],
})
export class ItemsModule {
}
