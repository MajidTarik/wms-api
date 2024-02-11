import { Module } from '@nestjs/common';
import { MasterdataController } from './masterdata.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ParametresModule} from "../parametres/parametres.module";
import {CategoriesModule} from "../categories/categories.module";
import {ItemsService} from "../items/items.service";
import {CurrencyEntity} from "../../../entities/arazan-db/masterdata/currency.entity";
import {DeliverymodeEntity} from "../../../entities/arazan-db/masterdata/deliverymode.entity";
import {LanguageEntity} from "../../../entities/arazan-db/masterdata/language.entity";
import {PaymentconditionEntity} from "../../../entities/arazan-db/masterdata/paymentcondition.entity";
import {PaymentmethodEntity} from "../../../entities/arazan-db/masterdata/paymentmethod.entity";
import {VendorEntity} from "../../../entities/arazan-db/masterdata/vendor.entity";
import {VendorgroupEntity} from "../../../entities/arazan-db/masterdata/vendorgroup.entity";
import {VendortypeEntity} from "../../../entities/arazan-db/masterdata/vendortype.entity";
import { MasterdataService } from './masterdata.service';
import {ControlobjectEntity} from "../../../entities/arazan-db/masterdata/controlobject.entity";
import {TaxeGroupEntity} from "../../../entities/arazan-db/masterdata/taxe-group.entity";
import {TaxeEntity} from "../../../entities/arazan-db/masterdata/taxe.entity";
import {TaxeByGroupEntity} from "../../../entities/arazan-db/masterdata/taxe-by-group.entity";
import {TaxeLineEntity} from "../../../entities/arazan-db/masterdata/taxe-line.entity";
import {DatesProvider} from "../../../helpers/providers/dates.provider";

@Module({
  controllers: [
      MasterdataController
  ],
  imports: [
    TypeOrmModule.forFeature([
      CurrencyEntity,
      DeliverymodeEntity,
      LanguageEntity,
      PaymentconditionEntity,
      PaymentmethodEntity,
      VendorEntity,
      VendorgroupEntity,
      VendortypeEntity,
      ControlobjectEntity,
      TaxeEntity,
      TaxeGroupEntity,
      TaxeByGroupEntity,
      TaxeLineEntity,
    ]),
    ParametresModule,
    CategoriesModule,
  ],
  providers: [
      MasterdataService,
      DatesProvider,
  ],
  exports: [MasterdataService],
})
export class MasterdataModule {}
