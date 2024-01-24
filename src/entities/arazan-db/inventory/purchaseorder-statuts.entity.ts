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
import {PurchaseorderEntity} from "./purchaseorder.entity";

@Entity('purchaseorderstatuts')
export class PurchaseorderStatutsEntity {
  @PrimaryColumn()
  refpurchaseorderstatuts: string;

  @Column()
  purchaseorderstatuts: string;

  @OneToMany(() => PurchaseorderEntity, (purchaseorderentity) => purchaseorderentity.purchaseorderstatuts)
  @JoinColumn([
    { name: 'refpurchaseorderstatuts', referencedColumnName: 'refpurchaseorderstatuts' },
  ])
  purchaseorders: PurchaseorderEntity[];
}
