import { Module } from '@nestjs/common';
import { PurchaseorderController } from './purchaseorder.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import { PurchaseorderService } from './purchaseorder.service';
import {ParametresModule} from "../../administration/parametres/parametres.module";
import {CategoriesModule} from "../../administration/categories/categories.module";
import {ItemsModule} from "../../administration/items/items.module";
import {PurchaseorderEntity} from "../../../entities/arazan-db/inventory/purchaseorder.entity";
import {PurchaseorderStatutsEntity} from "../../../entities/arazan-db/inventory/purchaseorder-statuts.entity";
import {PurchaseorderLinesEntity} from "../../../entities/arazan-db/inventory/purchaseorder-lines.entity";
import {PurchaserequisitionModule} from "../purchaserequisition/purchaserequisition.module";

@Module({
  controllers: [
      PurchaseorderController
  ],
  imports: [
    TypeOrmModule.forFeature([
      PurchaseorderEntity,
      PurchaseorderStatutsEntity,
      PurchaseorderLinesEntity,
    ]),
    ParametresModule,
    ItemsModule,
    CategoriesModule,
  ],
  providers: [
      PurchaseorderService,
  ],
  exports: [PurchaseorderService],
})
export class PurchaseorderModule {}
