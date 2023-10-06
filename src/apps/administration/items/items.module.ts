import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitsEntity } from '../../../entities/arazan-db/items/units.entity';
import { ItemsEntity } from '../../../entities/arazan-db/items/items.entity';
import { UomconversionEntity } from '../../../entities/arazan-db/items/uomconversion.entity';
import { PricemodelEntity } from '../../../entities/arazan-db/items/pricemodel.entity';
import { ItemsService } from './items.service';
import { UomclassicconversionEntity } from "../../../entities/arazan-db/items/uomclassicconversion.entity";

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
    ]),
  ],
  providers: [ItemsService],
  exports: [],
})
export class ItemsModule {}
