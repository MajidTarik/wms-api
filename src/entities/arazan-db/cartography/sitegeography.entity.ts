import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { UserEntity } from '../users/user.entity';
import { CompanyEntity } from './company.entity';
import { ParametresHeaderEntity } from "../parametres/parametres-header.entity";
import { ParametresEntity } from "../parametres/parametres.entity";
import { WarehouseEntity } from "./warehouse.entity";

@Entity('sitegeographic')
export class SitegeographyEntity {
  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  refsitegeographic: string;

  @Column()
  sitegeographic: string;

  @Column()
  actif: boolean;

  @Column()
  idheaderparametre: number;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => UserEntity)
  idoperateurcreation: UserEntity;

  @ManyToOne(() => UserEntity)
  idoperateurlastupdate: UserEntity;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, { nullable: false })
  @JoinColumn([{ name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' }])
  headerparametre: ParametresHeaderEntity;

  @OneToMany(() => WarehouseEntity, (warehouseEntity) => warehouseEntity.sitegeographic)
  @JoinColumn({ name: 'refsitegeographic' })
  warehouses: WarehouseEntity[];
}
