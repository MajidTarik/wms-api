import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryColumn
} from 'typeorm';
import { CompanyEntity } from '../cartography/company.entity';
import { CurrencyEntity } from './currency.entity';
import {TaxeLineEntity} from "./taxe-line.entity";
import {TaxeByGroupEntity} from "./taxe-by-group.entity";
import {ItemsEntity} from "../items/items.entity";
import {VariantsEntity} from "../items/variants.entity";

@Entity('taxe')
export class TaxeEntity {
  @PrimaryColumn()
  reftaxe: string;

  @Column()
  taxe: string;

  @PrimaryColumn()
  refcompany: string;

  @Column({nullable: true})
  refcurrency: string;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @ManyToOne(() => CurrencyEntity, (currencyentity) => currencyentity.refcurrency, {nullable: true})
  @JoinColumn([
    { name: 'refcurrency', referencedColumnName: 'refcurrency' },
  ])
  currency: CurrencyEntity;

  @OneToMany(() => TaxeLineEntity, (taxevalueentity) => taxevalueentity.taxe, {nullable: true})
  @JoinColumn([
    { name: 'reftaxe', referencedColumnName: 'reftaxe' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  taxevalues: TaxeLineEntity[];

  @OneToMany(() => TaxeByGroupEntity, (tbgentity) => tbgentity.taxe, {nullable: true})
  @JoinColumn([
    { name: 'reftaxe', referencedColumnName: 'reftaxe' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  groupsbytaxe: TaxeByGroupEntity[];

  @OneToMany(() => ItemsEntity, (itementity) => itementity.taxesales, { nullable: true })
  @JoinColumn([
    { name: 'reftaxe', referencedColumnName: 'reftaxesales' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  taxeitemsales: ItemsEntity[];

  @OneToMany(() => ItemsEntity, (itementity) => itementity.taxepurchase, { nullable: true })
  @JoinColumn([
    { name: 'reftaxe', referencedColumnName: 'reftaxepurch' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  taxeitempurchase: ItemsEntity[];
}
