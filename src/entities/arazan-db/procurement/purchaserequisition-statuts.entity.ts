import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { CompanyEntity } from '../cartography/company.entity';
import {VendorEntity} from "../masterdata/vendor.entity";
import {PurchaserequisitionEntity} from "./purchaserequisition.entity";

@Entity('purchaserequisitionstatuts')
export class PurchaserequisitionStatutsEntity {
  @PrimaryColumn()
  refpurchaserequisitionstatuts: string;

  @Column()
  purchaserequisitionstatuts: string;

  @OneToMany(() => PurchaserequisitionEntity, (purchaserequisitionentity) => purchaserequisitionentity.purchaserequisitionstatuts)
  @JoinColumn([
    { name: 'refpurchaserequisitionstatuts', referencedColumnName: 'refpurchaserequisitionstatuts' },
  ])
  purchasesrequisitions: PurchaserequisitionEntity[];
}
