import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryColumn, Unique,
  UpdateDateColumn
} from "typeorm";
import { UserEntity } from '../users/user.entity';
import { CompanyEntity } from '../cartography/company.entity';
import { ParametresHeaderEntity } from "../parametres/parametres-header.entity";
import { ItemsEntity } from "./items.entity";
import {PurchaserequisitionLinesEntity} from "../inventory/purchaserequisition-lines.entity";
import {TaxeEntity} from "../masterdata/taxe.entity";

@Entity('variants')
@Unique(['refcompany', 'refitem', 'idheadervariant'])
export class VariantsEntity {
  @PrimaryColumn()
  refvariant: string;

  @Column()
  refitem: string;

  @PrimaryColumn()
  refcompany: string;

  @Column()
  variantdescription: string;

  @Column({ default: false })
  stopedpurch: boolean;

  @Column({ default: false })
  stopedsales: boolean;

  @Column({ default: false })
  stopedinvent: boolean;

  @Column()
  barcode: string;

  @Column({ default: 0 })
  safetystock: number;

  @Column()
  searchname: string;

  @Column({ default: 0 })
  daystoexpiration: number;

  @Column()
  idheadervariant: number;

  @Column()
  idheaderparametre: number;

  @Column({nullable: true})
  reftaxepurchase: string;

  @Column({nullable: true})
  reftaxesales: string;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
  @JoinColumn({ name: 'refcompany' })
  company: CompanyEntity;

  @ManyToOne(() => ItemsEntity, (itemsentity) => itemsentity.refitem, {nullable: false})
  @JoinColumn([
    { name: 'refitem', referencedColumnName: 'refitem' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  item: ItemsEntity;

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, { nullable: false })
  @JoinColumn([{ name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' }])
  headerparametre: ParametresHeaderEntity;

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, { nullable: false })
  @JoinColumn([{ name: 'idheadervariant', referencedColumnName: 'idheaderparametre' }])
  headervariant: ParametresHeaderEntity;

  @OneToMany(() => PurchaserequisitionLinesEntity, (purchaserequisitionlinesEntity) => purchaserequisitionlinesEntity.variant)
  @JoinColumn([
    { name: 'refvariant', referencedColumnName: 'refvariant' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  purchaserequisitionlines: PurchaserequisitionLinesEntity[];

  @ManyToOne(() => TaxeEntity, (taxeentity) => taxeentity.taxeitemsales, {nullable: false})
  @JoinColumn([
    { name: 'reftaxesales', referencedColumnName: 'reftaxe' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  taxesales: TaxeEntity;

  @ManyToOne(() => TaxeEntity, (taxeentity) => taxeentity.taxeitempurchase, {nullable: false})
  @JoinColumn([
    { name: 'reftaxepurchase', referencedColumnName: 'reftaxe' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  taxepurchase: TaxeEntity;
}
