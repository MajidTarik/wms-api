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
import {TaxeByGroupEntity} from "./taxe-by-group.entity";

@Entity('taxegroup')
export class TaxeGroupEntity {
  @PrimaryColumn()
  reftaxegroup: string;

  @PrimaryColumn()
  refcompany: string;

  @Column()
  taxegroup: string;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @OneToMany(() => TaxeByGroupEntity, (taxebygroupentity) => taxebygroupentity.taxegroup, { nullable: false })
  @JoinColumn([
      { name: 'refcompany', referencedColumnName: 'refcompany' },
      { name: 'reftaxegroup', referencedColumnName: 'reftaxegroup' }
  ])
  taxes: TaxeByGroupEntity[];
}
