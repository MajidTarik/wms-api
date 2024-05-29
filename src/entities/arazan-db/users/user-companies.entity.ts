import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { UserEntity } from './user.entity';
import { CompanyEntity } from "../cartography/company.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";
import {UserCompaniesWarehousesEntity} from "./user-companies-warehouses.entity";

@Entity('usercompany')
export class UserCompaniesEntity {
  @PrimaryColumn()
  reforganisation: string;

  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  matricule: string;

  @Column({ default: true })
  actif: boolean;

  @Column({ default: false })
  defaultrefcompany: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
  @JoinColumn([
    { name: 'refcompany', referencedColumnName: 'refcompany'},
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  company: CompanyEntity;

  @ManyToOne(() => OrganisationEntity, (organisationentity) => organisationentity.reforganisation, {nullable: false})
  @JoinColumn([
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  organisation: OrganisationEntity;

  @ManyToOne(() => UserEntity, (userentity) => userentity.companiesusers, {nullable: false})
  @JoinColumn([
    { name: 'matricule', referencedColumnName: 'matricule' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation' },
  ])
  user: UserEntity;

  @OneToMany(() => UserCompaniesWarehousesEntity, (usercompanieswarehouseentity) => usercompanieswarehouseentity.user)
  @JoinColumn([
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation' },
    { name: 'refwarehouse', referencedColumnName: 'refwarehouse' },
  ])
  userscompanies: UserCompaniesWarehousesEntity[];
}
