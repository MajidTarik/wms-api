import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './apps/abac/users/users.module';
import { AuthentificationModule } from './apps/abac/authentification/authentification.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { WhCartographyModule } from './apps/administration/wh-cartography/wh-cartography.module';
import { ParametresModule } from './apps/administration/parametres/parametres.module';
import { MasterdataModule } from './apps/administration/masterdata/masterdata.module';
import {PurchaserequisitionModule} from "./apps/inventory/purchaserequisition/purchaserequisition.module";
import {PurchaseorderModule} from "./apps/inventory/purchaseorder/purchaseorder.module";

@Module({
  imports: [
    UsersModule,
    AuthentificationModule,
    WhCartographyModule,
    ParametresModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host,
      port: Number(process.env.port),
      username: process.env.user,
      password: process.env.password,
      database: process.env.database,
      autoLoadEntities: process.env.autoLoadEntities === 'true' ? true : false,
      synchronize: process.env.synchronize === 'true' ? true : false,
      logging: true,
    }),
    MasterdataModule,
    PurchaserequisitionModule,
    PurchaseorderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
