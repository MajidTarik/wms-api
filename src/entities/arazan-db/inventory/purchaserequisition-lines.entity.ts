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

  @Column()
  refitem: string;

  @Column({nullable: true})
  refvariant: string;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  quantity: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  price: number;

  @Column({nullable: true})
  idheaderparametre: number;

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
}
