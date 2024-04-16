import { Module } from '@nestjs/common';
import { PurchaserequisitionController } from './purchaserequisition.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import { PurchaserequisitionService } from './purchaserequisition.service';
import {PurchaserequisitionEntity} from "../../../entities/arazan-db/procurement/purchaserequisition.entity";
import {ParametresModule} from "../../administration/parametres/parametres.module";
import {CategoriesModule} from "../../administration/categories/categories.module";
import {
  PurchaserequisitionStatutsEntity
} from "../../../entities/arazan-db/procurement/purchaserequisition-statuts.entity";
import {PurchaserequisitionLinesEntity} from "../../../entities/arazan-db/procurement/purchaserequisition-lines.entity";
import {ItemsModule} from "../../administration/items/items.module";
import {PurchaseorderModule} from "../purchaseorder/purchaseorder.module";
import {MasterdataModule} from "../../administration/masterdata/masterdata.module";

@Module({
  controllers: [
      PurchaserequisitionController
  ],
  imports: [
    TypeOrmModule.forFeature([
      PurchaserequisitionEntity,
      PurchaserequisitionStatutsEntity,
      PurchaserequisitionLinesEntity,
    ]),
    ParametresModule,
    ItemsModule,
    CategoriesModule,
    MasterdataModule,
    PurchaseorderModule,
  ],
  providers: [
      PurchaserequisitionService,
  ],
  exports: [],
})
export class PurchaserequisitionModule {}
