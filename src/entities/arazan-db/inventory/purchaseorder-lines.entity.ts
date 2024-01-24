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
import {PurchaseorderEntity} from "./purchaseorder.entity";
import {PurchaserequisitionLinesEntity} from "./purchaserequisition-lines.entity";

@Entity('purchaseorderlines')
export class PurchaseorderLinesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  idlinepurchaserequisition: number;

  @Column()
  refpurchaseorder: string;

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

  @ManyToOne(() => PurchaseorderEntity, (purchaseorderEntity) => purchaseorderEntity.purchaseorderlines, {nullable: false})
  @JoinColumn([
    { name: 'refpurchaseorder', referencedColumnName: 'refpurchaseorder' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  purchaseorder: PurchaseorderEntity;

  @ManyToOne(() => ItemsEntity, (itemsEntity) => itemsEntity.refitem, {nullable: false})
  @JoinColumn([
    { name: 'refitem', referencedColumnName: 'refitem' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  item: ItemsEntity;

  @ManyToOne(() => VariantsEntity, (variantsEntity) => variantsEntity.refvariant, {nullable: false})
  @JoinColumn([
    { name: 'refvariant', referencedColumnName: 'refvariant' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  variant: VariantsEntity;

  @ManyToOne(() => PurchaserequisitionLinesEntity, (purchaserequisitionLinesEntity) => purchaserequisitionLinesEntity.id, {nullable: false})
  @JoinColumn([
    { name: 'idlinepurchaserequisition', referencedColumnName: 'id' },
  ])
  purchaserequisitionline: PurchaserequisitionLinesEntity;

}
