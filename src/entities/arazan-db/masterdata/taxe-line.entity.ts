import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { CompanyEntity } from '../cartography/company.entity';
import { TaxeEntity } from "./taxe.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('taxeline')
export class TaxeLineEntity {
  @PrimaryColumn()
  reftaxe: string;

  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  reforganisation: string;

  @PrimaryColumn({ type: 'date' })
  datedebut: string;

  @Column({ type: 'date', nullable: false })
  datefin: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  percentage: number;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
  @JoinColumn([
    {name: 'refcompany', referencedColumnName: 'refcompany'},
    {name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  company: CompanyEntity;

  @ManyToOne(() => OrganisationEntity, (organisationentity) => organisationentity.reforganisation, {nullable: false})
  @JoinColumn([
    {name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  organisation: OrganisationEntity;

  @ManyToOne(() => TaxeEntity, (taxeentity) => taxeentity.taxevalues, {nullable: false})
  @JoinColumn([
    { name: 'reftaxe', referencedColumnName: 'reftaxe' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    {name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  taxe: TaxeEntity;
}
