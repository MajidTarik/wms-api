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

@Entity('parametresattributs')
export class ParametresAttributEntity {
  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  refparametre: string;

  @PrimaryColumn()
  value: string;

  @Column()
  actif: boolean;

  @Column({ default: false })
  isdefault: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => ParametresEntity, (parametresentity) => parametresentity.parametresattributs, {nullable: false})
  @JoinColumn([
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'refparametre', referencedColumnName: 'refparametre' }
  ])
  parametre: ParametresEntity;

  @OneToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
  @JoinColumn([
    { name: 'refcompany', referencedColumnName: 'refcompany' }
  ])
  company: CompanyEntity;

  @OneToMany(() => ParametresLineEntity, (parametreslineentity) => parametreslineentity.parametresattributs)
  parametreslines: ParametresLineEntity[];
}
