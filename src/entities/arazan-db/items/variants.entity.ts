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

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, { nullable: false })
  @JoinColumn([{ name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' }])
  headerparametre: ParametresHeaderEntity;

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, { nullable: false })
  @JoinColumn([{ name: 'idheadervariant', referencedColumnName: 'idheaderparametre' }])
  headervariant: ParametresHeaderEntity;
}
