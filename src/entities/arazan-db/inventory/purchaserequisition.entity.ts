import {
  BeforeUpdate,
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
import {PurchaserequisitionStatutsEntity} from "./purchaserequisition-statuts.entity";
import {ItemsEntity} from "../items/items.entity";
import {PurchaserequisitionLinesEntity} from "./purchaserequisition-lines.entity";

@Entity('purchaserequisition')
export class PurchaserequisitionEntity {
  @PrimaryColumn()
  refpurchaserequisition: string;

  @PrimaryColumn()
  refcompany: string;

  @Column()
  refpurchaserequisitionstatuts: string;

  @Column()
  preparator: string;

  @Column()
  requisitionobjectif: string;

  @CreateDateColumn({ type: 'timestamptz' })
  requisitiondate: Date;

  @Column({nullable: true})
  details: string;

  @Column({nullable: true})
  submittedby: string;

  @Column({nullable: true})
  datesubmittion: Date;

  @Column({nullable: true})
  approvedby: string;

  @Column({nullable: true})
  dateapprovement: Date;

  @Column({nullable: true})
  closedby: string;

  @Column({nullable: true})
  dateclosing: Date;

  @Column({nullable: true})
  rejectedby: string;

  @Column({nullable: true})
  daterejection: Date;

  @Column({ length: 256 })
  description: string;

  @Column()
  actif: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
  @JoinColumn({ name: 'refcompany' })
  company: CompanyEntity;

  @ManyToOne(() => PurchaserequisitionStatutsEntity, (purchaserequisitionStatutsentity) => purchaserequisitionStatutsentity.purchasesrequisitions, {nullable: false})
  @JoinColumn([
    { name: 'refpurchaserequisitionstatuts', referencedColumnName: 'refpurchaserequisitionstatuts' },
  ])
  purchaserequisitionstatuts: PurchaserequisitionStatutsEntity;

  @ManyToOne(() => UserEntity, (userentity) => userentity.matricule, {nullable: false})
  @JoinColumn([
    { name: 'preparator', referencedColumnName: 'matricule' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  preparatorpurchreq: UserEntity;

  @ManyToOne(() => UserEntity, (userentity) => userentity.matricule, {nullable: false})
  @JoinColumn([
    { name: 'submittedby', referencedColumnName: 'matricule' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  submitterpurchreq: UserEntity;

  @ManyToOne(() => UserEntity, (userentity) => userentity.matricule, {nullable: false})
  @JoinColumn([
    { name: 'approvedby', referencedColumnName: 'matricule' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  approvalpurchreq: UserEntity;

  @ManyToOne(() => UserEntity, (userentity) => userentity.matricule, {nullable: false})
  @JoinColumn([
    { name: 'closedby', referencedColumnName: 'matricule' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  closedpurchreq: UserEntity;

  @ManyToOne(() => UserEntity, (userentity) => userentity.matricule, {nullable: false})
  @JoinColumn([
    { name: 'rejectedby', referencedColumnName: 'matricule' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  rejecterpurchreq: UserEntity;

  @OneToMany(() => PurchaserequisitionLinesEntity, (purchaserequisitionlinesEntity) => purchaserequisitionlinesEntity.purchaserequisition)
  @JoinColumn([
    { name: 'refpurchaserequisition', referencedColumnName: 'refpurchaserequisition' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  purchaserequisitionlines: PurchaserequisitionLinesEntity[];
}
