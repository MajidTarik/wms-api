import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { CompanyEntity } from '../cartography/company.entity';
import { ParametresAttributEntity } from './parametres-attribut.entity';
import { ParametresTypesEntity } from "./parametres-types.entity";

@Entity('parametres')
export class ParametresEntity {
  @Column()
  order: number;

  @PrimaryColumn()
  refparametre: string;

  @PrimaryColumn()
  refcompany: string;

  @Column()
  parametre: string;

  @Column()
  actif: boolean;

  @Column()
  reftypeparametre: string;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.parametres, {nullable: false})
  @JoinColumn({ name: 'refcompany' })
  company: CompanyEntity;

  @ManyToOne(() => ParametresTypesEntity, (parametrestypesentity) => parametrestypesentity.parametres, {nullable: false})
  @JoinColumn({ name: 'reftypeparametre' })
  parametrestype: ParametresTypesEntity;

  @OneToMany(() => ParametresAttributEntity, (parametresAttributEntity) => parametresAttributEntity.parametre)
  parametresattributs: ParametresAttributEntity[];

}
