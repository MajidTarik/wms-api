import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { ParametresModule } from "../parametres/parametres.module";
import { CategoriesgroupEntity } from "../../../entities/arazan-db/categories/categoriesgroup.entity";
import { CategoriesEntity } from "../../../entities/arazan-db/categories/categories.entity";
import {CategoriesaffectationsEntity} from "../../../entities/arazan-db/categories/categoriesaffectations.entity";

@Module({
  controllers: [
    CategoriesController,
  ],
  imports: [
    TypeOrmModule.forFeature([
      CategoriesgroupEntity,
      CategoriesEntity,
      CategoriesaffectationsEntity,
    ]),
    ParametresModule,
  ],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
