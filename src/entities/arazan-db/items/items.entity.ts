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
import { UnitsEntity } from "./units.entity";
import { ParametresHeaderEntity } from "../parametres/parametres-header.entity";
import { PricemodelEntity } from "./pricemodel.entity";
import { VariantsEntity } from "./variants.entity";
import {ItemtrackingEntity} from "./itemtracking.entity";

@Entity('items')
export class ItemsEntity {
  @PrimaryColumn()
  refitem: string;

  @PrimaryColumn()
  refcompany: string;

  @Column()
  item: string;

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
  refunitinvent: string;

  @Column()
  refunitsales: string;

  @Column()
  refunitpurch: string;

  @Column()
  refunitorder: string;

  @Column()
  itemdescription: string;

  @Column()
  searchname: string;

  @Column({ default: 0 })
  expirationdate: number;

  @Column({ default: 0 })
  bestbeforetime: number;

  @Column({ default: 0 })
  removaltime: number;

  @Column({ default: 0 })
  alerttime: number;

  @Column()
  refpricemodel: string;

  @Column({nullable: true})
  refitemtracking: string;

  @Column()
  idheaderparametre: number;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  idoperateurcreation: UserEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  idoperateurlastupdate: UserEntity;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
  @JoinColumn({ name: 'refcompany' })
  company: CompanyEntity;

  @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, {nullable: false})
  @JoinColumn([
    { name: 'refunitinvent', referencedColumnName: 'refunit' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  unitinvent: UnitsEntity;

  @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, {nullable: false})
  @JoinColumn([
    { name: 'refunitsales', referencedColumnName: 'refunit' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  unitsales: UnitsEntity;

  @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, {nullable: false})
  @JoinColumn([
    { name: 'refunitpurch', referencedColumnName: 'refunit' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  unitpurch: UnitsEntity;

  @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, {nullable: false})
  @JoinColumn([
    { name: 'refunitorder', referencedColumnName: 'refunit' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  unitorder: UnitsEntity;

  @ManyToOne(() => PricemodelEntity, (pricemodelentity) => pricemodelentity.refpricemodel, {nullable: false})
  @JoinColumn([
    { name: 'refpricemodel', referencedColumnName: 'refpricemodel' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  pricemodel: PricemodelEntity;

  @ManyToOne(() => ItemtrackingEntity, (itemtrackingentity) => itemtrackingentity.refitemtracking, {nullable: true})
  @JoinColumn([
    { name: 'refitemtracking', referencedColumnName: 'refitemtracking' }
  ])
  itemtracking: ItemtrackingEntity;

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, { nullable: false })
  @JoinColumn([{ name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' }])
  headerparametre: ParametresHeaderEntity;


  @OneToMany(() => VariantsEntity, (variantsentity) => variantsentity.refitem)
  @JoinColumn([
    { name: 'refitem', referencedColumnName: 'refitem' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  variants: VariantsEntity[];
}
