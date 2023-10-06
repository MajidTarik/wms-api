import { Module } from '@nestjs/common';
import { ParametresController } from './parametres.controller';
import { ParametresService } from './parametres.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametresEntity } from '../../../entities/arazan-db/parametres/parametres.entity';
import { ParametresAttributEntity } from '../../../entities/arazan-db/parametres/parametres-attribut.entity';
import { ParametresHeaderEntity } from '../../../entities/arazan-db/parametres/parametres-header.entity';
import { ParametresLineEntity } from '../../../entities/arazan-db/parametres/parametres-line.entity';
import { ParametresTypesEntity } from "../../../entities/arazan-db/parametres/parametres-types.entity";

@Module({
  controllers: [ParametresController],
  providers: [ParametresService],
  imports: [
    TypeOrmModule.forFeature([
      ParametresEntity,
      ParametresAttributEntity,
      ParametresHeaderEntity,
      ParametresLineEntity,
      ParametresTypesEntity,
    ]),
  ],
  exports: [ParametresService],
})
export class ParametresModule {
}
