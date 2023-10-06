import {
  Column,
  CreateDateColumn,
  Entity, Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { UserEntity } from '../users/user.entity';
import { CompanyEntity } from '../cartography/company.entity';
import { UnitsEntity } from './units.entity';
import { ItemsEntity } from './items.entity';

@Entity('uomconversion')
export class UomconversionEntity {
  @Column({primary: false, generated: "increment", type: "integer"})
  id: string;

  @PrimaryColumn()
  refitem: string;

  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  refunitfrom: string;

  @PrimaryColumn()
  refunitto: string;

  @Column({type: "decimal", precision: 7, scale: 2, default: 0})
  coefficient: number;

  @Column()
  actif: boolean;

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
    { name: 'refunitfrom', referencedColumnName: 'refunit' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  unitfrom: UnitsEntity;

  @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, {nullable: false})
  @JoinColumn([
    { name: 'refunitto', referencedColumnName: 'refunit' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  unitto: UnitsEntity;

  @ManyToOne(() => ItemsEntity, (itemsentity) => itemsentity.refitem, {nullable: false})
  @JoinColumn([
    { name: 'refitem', referencedColumnName: 'refitem' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  item: ItemsEntity;
}
