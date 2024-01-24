import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { UserEntity } from './user.entity';
import { CompanyEntity } from "../cartography/company.entity";

@Entity('usercompany')
export class UserCompaniesEntity {
  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  matricule: string;

  @Column({ default: true })
  actif: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.userscompanies, {nullable: false})
  @JoinColumn({ name: 'refcompany' })
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, (userentity) => userentity.companiesusers, {nullable: false})
  @JoinColumn([
    { name: 'matricule', referencedColumnName: 'matricule' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  user: UserEntity;
}
