import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { ParametresEntity } from '../parametres/parametres.entity';
import { WarehouseEntity } from "./warehouse.entity";
import { SitegeographyEntity } from "./sitegeography.entity";
import { AreaEntity } from "./area.entity";
import { UnitsEntity } from "../items/units.entity";
import { ItemsEntity } from "../items/items.entity";
import { UomconversionEntity } from "../items/uomconversion.entity";
import { UserCompaniesEntity } from "../users/user-companies.entity";

@Entity('company')
export class CompanyEntity {
  @PrimaryColumn()
  refcompany: string;

  @Column()
  company: string;

  @Column()
  tel1: string;

  @Column()
  email1: string;

  @Column()
  responsable1: string;

  @Column({nullable: true})
  responsable2: string;

  @Column({nullable: true})
  tel2: string;

  @Column({nullable: true})
  email2: string;

  @Column({default: true})
  actif: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @OneToOne(() => UserEntity, {nullable: true})
  @JoinColumn()
  idoperateurcreation: UserEntity;

  @OneToOne(() => UserEntity,{nullable: true})
  @JoinColumn()
  idoperateurlastupdate: UserEntity;

  @OneToMany(() => ParametresEntity, (parametresentity) => parametresentity.company)
  @JoinColumn({ name: 'refcompany' })
  parametres: ParametresEntity[];

  @OneToMany(() => WarehouseEntity, (warehouseEntity) => warehouseEntity.company)
  @JoinColumn({ name: 'refcompany' })
  warehouses: WarehouseEntity[];

  @OneToMany(() => SitegeographyEntity, (sitegeographyentity) => sitegeographyentity.company)
  @JoinColumn({ name: 'refcompany' })
  sitesgeographics: SitegeographyEntity[];

  @OneToMany(() => AreaEntity, (areaentity) => areaentity.company)
  @JoinColumn({ name: 'refcompany' })
  areas: AreaEntity[];

  @OneToMany(() => UnitsEntity, (unitsentity) => unitsentity.company)
  @JoinColumn({ name: 'refcompany' })
  units: UnitsEntity[];

  @OneToMany(() => ItemsEntity, (itemsentity) => itemsentity.company)
  @JoinColumn({ name: 'refcompany' })
  items: ItemsEntity[];

  @OneToMany(() => UomconversionEntity, (uomconversionentity) => uomconversionentity.company)
  @JoinColumn({ name: 'refcompany' })
  uomconversions: UomconversionEntity[];

  @OneToMany(() => UserCompaniesEntity, (usercompaniesentity) => usercompaniesentity.company)
  @JoinColumn({ name: 'refcompany' })
  userscompanies: UserCompaniesEntity[];

  @OneToMany(() => UserEntity, (userentity) => userentity.company)
  @JoinColumn({ name: 'refcompany' })
  users: UserEntity[];
}
