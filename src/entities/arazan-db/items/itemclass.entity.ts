import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn, Unique, PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { CompanyEntity } from '../cartography/company.entity';
import { VariantsEntity } from './variants.entity';
import { ItemsEntity } from './items.entity';
import { WarehouseEntity } from '../cartography/warehouse.entity';
import { Abcclass } from '../../../helpers/abcclass';

@Entity('itemclass')
@Unique(['refitem', 'refvariant', 'refcompany', 'refwarehouse'])
export class ItemclassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refitem: string;

  @Column({ nullable: true })
  refvariant: string;

  @Column()
  refcompany: string;

  @Column()
  refwarehouse: string;

  @Column({
    type: 'enum',
    enum: Abcclass,
    default: Abcclass.NONE,
  })
  class: Abcclass;

  @Column({default: true})
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

  @ManyToOne(() => ItemsEntity, (itemsentity) => itemsentity.refitem, {nullable: false})
  @JoinColumn([
    { name: 'refitem', referencedColumnName: 'refitem' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  item: ItemsEntity;

  @ManyToOne(() => WarehouseEntity, (warehouseentity) => warehouseentity.refwarehouse, {nullable: false})
  @JoinColumn([
    { name: 'refwarehouse', referencedColumnName: 'refwarehouse' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  warehouse: WarehouseEntity;

  @ManyToOne(() => VariantsEntity, (variantsentity) => variantsentity.refvariant)
  @JoinColumn([
    { name: 'refvariant', referencedColumnName: 'refvariant' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  variant: VariantsEntity;
}
