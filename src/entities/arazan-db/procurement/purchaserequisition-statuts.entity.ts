import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
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
