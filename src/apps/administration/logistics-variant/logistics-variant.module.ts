import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../entities/arazan-db/users/user.entity';
import { CompanyEntity } from '../../../entities/arazan-db/cartography/company.entity';
import { ParametresEntity } from '../../../entities/arazan-db/parametres/parametres.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        CompanyEntity,
        UserEntity,
        ParametresEntity,
      ]
    )
  ],
})
export class LogisticsVariantModule {
}
