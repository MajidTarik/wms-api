import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from '../cartography/company.entity';
import { UnitsEntity } from './units.entity';
import { ParametresHeaderEntity } from '../parametres/parametres-header.entity';
import { PricemodelEntity } from './pricemodel.entity';
import { VariantsEntity } from './variants.entity';
import { ItemtrackingEntity } from './itemtracking.entity';
import { PurchaserequisitionLinesEntity } from '../procurement/purchaserequisition-lines.entity';
import { CategoriesaffectationsEntity } from '../categories/categoriesaffectations.entity';
import { TaxeEntity } from '../masterdata/taxe.entity';

@Entity('items')
export class ItemsEntity {
  @PrimaryColumn()
  refitem: string;

  @PrimaryColumn()
  refcompany: string;

  @Column()
  item: string;

  @Column({ default: false, nullable: true })
  stopedpurch: boolean;

  @Column({ default: false, nullable: true })
  stopedsales: boolean;

  @Column({ default: false, nullable: true })
  stopedinvent: boolean;

  @Column({ nullable: true })
  barcode: string;

  @Column({ default: 0, nullable: true })
  safetystock: number;

  @Column({ nullable: true })
  refunitinvent: string;

  @Column({ nullable: true })
  refunitsales: string;

  @Column({ nullable: true })
  refunitpurch: string;

  @Column({ nullable: true })
  refunitorder: string;

  @Column({ nullable: true })
  itemdescription: string;

  @Column({ nullable: true })
  searchname: string;

  @Column({ default: 0, nullable: true })
  expirationdate: number;

  @Column({ default: 0, nullable: true })
  bestbeforetime: number;

  @Column({ default: 0, nullable: true })
  removaltime: number;

  @Column({ default: 0, nullable: true })
  alerttime: number;

  @Column({ nullable: true })
  refpricemodel: string;

  @Column({ nullable: true })
  refitemtracking: string;

  @Column({ nullable: true })
  reftaxepurchase: string;

  @Column({ nullable: true })
  reftaxesales: string;

  @Column({ default: false })
  havevariant: boolean;

  @Column({ nullable: true })
  idheaderparametre: number;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn({ name: 'refcompany' })
  company: CompanyEntity;

  @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, { nullable: true })
  @JoinColumn([
    { name: 'refunitinvent', referencedColumnName: 'refunit' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  unitinvent: UnitsEntity;

  @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, { nullable: true })
  @JoinColumn([
    { name: 'refunitsales', referencedColumnName: 'refunit' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  unitsales: UnitsEntity;

  @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, { nullable: true })
  @JoinColumn([
    { name: 'refunitpurch', referencedColumnName: 'refunit' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  unitpurch: UnitsEntity;

  @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, { nullable: true })
  @JoinColumn([
    { name: 'refunitorder', referencedColumnName: 'refunit' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  unitorder: UnitsEntity;

  @ManyToOne(() => PricemodelEntity, (pricemodelentity) => pricemodelentity.refpricemodel, { nullable: true })
  @JoinColumn([
    { name: 'refpricemodel', referencedColumnName: 'refpricemodel' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  pricemodel: PricemodelEntity;

  @ManyToOne(() => ItemtrackingEntity, (itemtrackingentity) => itemtrackingentity.refitemtracking, { nullable: true })
  @JoinColumn([
    { name: 'refitemtracking', referencedColumnName: 'refitemtracking' },
  ])
  itemtracking: ItemtrackingEntity;

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, { nullable: true })
  @JoinColumn([{ name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' },])
  headerparametre: ParametresHeaderEntity;

  @ManyToOne(() => TaxeEntity, (taxeentity) => taxeentity.taxeitemsales, { nullable: true })
  @JoinColumn([
    { name: 'reftaxesales', referencedColumnName: 'reftaxe' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  taxesales: TaxeEntity;

  @ManyToOne(() => TaxeEntity, (taxeentity) => taxeentity.taxeitempurchase, { nullable: true })
  @JoinColumn([
    { name: 'reftaxepurchase', referencedColumnName: 'reftaxe' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  taxepurchase: TaxeEntity;

  @OneToMany(() => VariantsEntity, (variantsentity) => variantsentity.refitem, { nullable: true })
  @JoinColumn([
    { name: 'refitem', referencedColumnName: 'refitem' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  variants: VariantsEntity[];

  @OneToMany(() => PurchaserequisitionLinesEntity, (purchaserequisitionlinesEntity) => purchaserequisitionlinesEntity.item, { nullable: true })
  @JoinColumn([
    { name: 'refitem', referencedColumnName: 'refitem' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  purchaserequisitionlines: PurchaserequisitionLinesEntity[];

  @OneToMany(() => CategoriesaffectationsEntity, (categoriesaffectationsentity) => categoriesaffectationsentity.item, { nullable: true })
  @JoinColumn([
    { name: 'refitem', referencedColumnName: 'refentity' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  categoriesaffectation: CategoriesaffectationsEntity[];
}
