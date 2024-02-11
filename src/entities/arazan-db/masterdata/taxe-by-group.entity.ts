import {
  Column,
  Entity,
  JoinColumn, ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { VendorEntity } from './vendor.entity';
import { CompanyEntity } from "../cartography/company.entity";
import {CurrencyEntity} from "./currency.entity";
import {TaxeEntity} from "./taxe.entity";
import {TaxeGroupEntity} from "./taxe-group.entity";

@Entity('taxebygroup')
export class TaxeByGroupEntity {
  @PrimaryColumn()
  reftaxegroup: string;

  @PrimaryColumn()
  reftaxe: string;

  @PrimaryColumn()
  refcompany: string;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @ManyToOne(() => TaxeEntity, (taxeentity) => taxeentity.reftaxe, { nullable: false })
  @JoinColumn([
      { name: 'reftaxe', referencedColumnName: 'reftaxe' },
      { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  taxe: TaxeEntity;

  @ManyToOne(() => TaxeGroupEntity, (taxegroupentity) => taxegroupentity.reftaxegroup, { nullable: false })
  @JoinColumn([
    { name: 'reftaxegroup', referencedColumnName: 'reftaxegroup' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  taxegroup: TaxeGroupEntity;
}
