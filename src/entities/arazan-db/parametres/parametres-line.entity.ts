import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { ParametresAttributEntity } from "./parametres-attribut.entity";
import { CompanyEntity } from "../cartography/company.entity";
import { ParametresHeaderEntity } from "./parametres-header.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('parametreslines')
export class ParametresLineEntity {
  @PrimaryColumn()
  idheaderparametre: number;

  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  refparametre: string;

  @PrimaryColumn()
  value: string;

  @PrimaryColumn()
  reforganisation: string;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.parametreslines, {nullable: false})
  @JoinColumn([
    { name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' },
  ])
  parametresheaders: ParametresHeaderEntity;

  @ManyToOne(() => ParametresAttributEntity, (parametresattributentity) => parametresattributentity.parametreslines, {nullable: false})
  @JoinColumn([
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'refparametre', referencedColumnName: 'refparametre' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
    { name: 'value', referencedColumnName: 'value' },
  ])
  parametresattributs: ParametresAttributEntity;

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
}
