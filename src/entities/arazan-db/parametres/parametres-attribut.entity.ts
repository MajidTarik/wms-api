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
import { ParametresEntity } from './parametres.entity';
import { CompanyEntity } from '../cartography/company.entity';
import { ParametresLineEntity } from "./parametres-line.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('parametresattributs')
export class ParametresAttributEntity {
  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  refparametre: string;

  @PrimaryColumn()
  value: string;

  @PrimaryColumn()
  reforganisation: string;

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
    { name: 'refparametre', referencedColumnName: 'refparametre' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  parametre: ParametresEntity;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
  @JoinColumn([
    { name: 'refcompany', referencedColumnName: 'refcompany'},
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  company: CompanyEntity;

  @ManyToOne(() => OrganisationEntity, (organisationentity) => organisationentity.reforganisation, {nullable: false})
  @JoinColumn([
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  organisation: OrganisationEntity;

  @OneToMany(() => ParametresLineEntity, (parametreslineentity) => parametreslineentity.parametresattributs)
  parametreslines: ParametresLineEntity[];
}
