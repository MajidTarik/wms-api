import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { CompanyEntity } from '../cartography/company.entity';
import { ParametresAttributEntity } from './parametres-attribut.entity';
import { ParametresTypesEntity } from "./parametres-types.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('parametres')
export class ParametresEntity {
  @Column()
  order: number;

  @PrimaryColumn()
  refparametre: string;

  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  reforganisation: string;

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

  @ManyToOne(() => ParametresTypesEntity, (parametrestypesentity) => parametrestypesentity.parametres, {nullable: false})
  @JoinColumn({ name: 'reftypeparametre' })
  parametrestype: ParametresTypesEntity;

  @OneToMany(() => ParametresAttributEntity, (parametresAttributEntity) => parametresAttributEntity.parametre)
  parametresattributs: ParametresAttributEntity[];

}
