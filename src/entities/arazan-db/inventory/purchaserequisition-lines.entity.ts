import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn, Unique
} from 'typeorm';
import { CompanyEntity } from '../cartography/company.entity';
import {PurchaserequisitionEntity} from "./purchaserequisition.entity";
import {ItemsEntity} from "../items/items.entity";
import {VariantsEntity} from "../items/variants.entity";
import {ParametresHeaderEntity} from "../parametres/parametres-header.entity";
import {VendorEntity} from "../masterdata/vendor.entity";
import {CurrencyEntity} from "../masterdata/currency.entity";
import {TaxeEntity} from "../masterdata/taxe.entity";
import {TaxeGroupEntity} from "../masterdata/taxe-group.entity";

@Entity('purchaserequisitionlines')
export class PurchaserequisitionLinesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  refvendor: string;

  @Column()
  refpurchaserequisition: string;

  @Column()
  refcompany: string;

  @Column({nullable: true})
  refitem: string;

  @Column({nullable: true})
  refvariant: string;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  quantity: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  price: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  discountvalue: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  discountpercentage: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  lineamounthtvalue: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  linepricehtvalue: number;

  @Column({nullable: true})
  idheaderparametre: number;

  @Column({ nullable: true })
  refcurrency: string;

  @Column({ nullable: true })
  reftaxe: string;

  @Column({ nullable: true, type: "decimal", precision: 10, scale: 2, default: 0 })
  taxevalue: number;

  @Column({ nullable: true, type: "decimal", precision: 10, scale: 2, default: 0 })
  linepricettcvalue: number;

  @Column({ nullable: true, type: "decimal", precision: 10, scale: 2, default: 0 })
  lineamountttcvalue: number;

  @Column({ nullable: true, type: "decimal", precision: 10, scale: 2, default: 0 })
  lineamounttvavalue: number;

  @Column({ nullable: true })
  reftaxegroup: string;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
  @JoinColumn({ name: 'refcompany' })
  company: CompanyEntity;

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, { nullable: false })
  @JoinColumn([{ name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' }])
  headerparametre: ParametresHeaderEntity;

  @ManyToOne(() => PurchaserequisitionEntity, (purchaserequisitionEntity) => purchaserequisitionEntity.purchaserequisitionlines, {nullable: false})
  @JoinColumn([
    { name: 'refpurchaserequisition', referencedColumnName: 'refpurchaserequisition' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  purchaserequisition: PurchaserequisitionEntity;

  @ManyToOne(() => ItemsEntity, (itemsEntity) => itemsEntity.purchaserequisitionlines, {nullable: false})
  @JoinColumn([
    { name: 'refitem', referencedColumnName: 'refitem' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  item: ItemsEntity;

  @ManyToOne(() => VariantsEntity, (variantsEntity) => variantsEntity.purchaserequisitionlines, {nullable: false})
  @JoinColumn([
    { name: 'refvariant', referencedColumnName: 'refvariant' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  variant: VariantsEntity;

  @ManyToOne(() => VendorEntity, (vendorentity) => vendorentity.refvendor, {nullable: true})
  @JoinColumn([
    { name: 'refvendor', referencedColumnName: 'refvendor' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  vendor: VendorEntity;

  @ManyToOne(() => CurrencyEntity, (currencyentity) => currencyentity.refcurrency, {nullable: true})
  @JoinColumn([
    { name: 'refcurrency', referencedColumnName: 'refcurrency' },
  ])
  currency: CurrencyEntity;

  @ManyToOne(() => TaxeEntity, (taxeEntity) => taxeEntity.reftaxe, {nullable: false})
  @JoinColumn([
    { name: 'reftaxe', referencedColumnName: 'reftaxe' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  taxepurchreqline: TaxeEntity;

  @ManyToOne(() => TaxeGroupEntity, (taxegroupEntity) => taxegroupEntity.reftaxegroup, {nullable: false})
  @JoinColumn([
    { name: 'reftaxegroup', referencedColumnName: 'reftaxegroup' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  taxegrouppurchreqline: TaxeGroupEntity;
}
