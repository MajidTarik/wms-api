import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { UserEntity } from '../users/user.entity';
import { ParametresEntity } from './parametres.entity';
import { CompanyEntity } from '../cartography/company.entity';
import { ParametresLineEntity } from "./parametres-line.entity";

@Entity('parametrestypes')
export class ParametresTypesEntity {
  @PrimaryColumn()
  reftypeparametre: string;

  @Column()
  typeparametre: string;

  @OneToMany(() => ParametresEntity, (parametresentity) => parametresentity.parametrestype)
  parametres: ParametresEntity[];
}
