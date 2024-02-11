import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { CompanyEntity } from '../cartography/company.entity';
import {PurchaseorderStatutsEntity} from "./purchaseorder-statuts.entity";
import {PurchaseorderLinesEntity} from "./purchaseorder-lines.entity";
import {VendorEntity} from "../masterdata/vendor.entity";
import {PurchaserequisitionEntity} from "./purchaserequisition.entity";

@Entity('purchaseorder')
export class PurchaseorderEntity {
  @PrimaryColumn()
  refpurchaseorder: string;

  @PrimaryColumn()
  refcompany: string;

  @Column()
  refpurchaseorderstatuts: string;

  @Column()
  refvendor: string;

  @Column()
  refpurchaserequisition: string;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
  @JoinColumn({ name: 'refcompany' })
  company: CompanyEntity;

  @ManyToOne(() => PurchaseorderStatutsEntity, (purchaseorderStatutsentity) => purchaseorderStatutsentity.purchaseorders, {nullable: false})
  @JoinColumn([
    { name: 'refpurchaseorderstatuts', referencedColumnName: 'refpurchaseorderstatuts' },
  ])
  purchaseorderstatuts: PurchaseorderStatutsEntity;

  @OneToMany(() => PurchaseorderLinesEntity, (purchaseorderlinesEntity) => purchaseorderlinesEntity.purchaseorder)
  @JoinColumn([
    { name: 'refpurchaseorder', referencedColumnName: 'refpurchaseorder' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  purchaseorderlines: PurchaseorderLinesEntity[];

  @ManyToOne(() => VendorEntity, (vendorentity) => vendorentity.refvendor, {nullable: true})
  @JoinColumn([
    { name: 'refvendor', referencedColumnName: 'refvendor' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  vendor: VendorEntity;

  @ManyToOne(() => PurchaserequisitionEntity, (purchaserequisitionentity) => purchaserequisitionentity.refpurchaserequisition, {nullable: true})
  @JoinColumn([
    { name: 'refpurchaserequisition', referencedColumnName: 'refpurchaserequisition' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  purchaserequisition: PurchaserequisitionEntity;
}
