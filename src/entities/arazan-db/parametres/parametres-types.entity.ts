import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { ParametresEntity } from './parametres.entity';

@Entity('parametrestypes')
export class ParametresTypesEntity {
  @PrimaryColumn()
  reftypeparametre: string;

  @Column()
  typeparametre: string;

  @OneToMany(() => ParametresEntity, (parametresentity) => parametresentity.parametrestype)
  parametres: ParametresEntity[];
}
