import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../entities/arazan-db/users/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {UserCompaniesEntity} from "../../../entities/arazan-db/users/user-companies.entity";
import {UserCompaniesWarehousesEntity} from "../../../entities/arazan-db/users/user-companies-warehouses.entity";
import {MasterdataModule} from "../../administration/masterdata/masterdata.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([
          UserEntity,
          UserCompaniesEntity,
          UserCompaniesWarehousesEntity,
      ]),
      MasterdataModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
