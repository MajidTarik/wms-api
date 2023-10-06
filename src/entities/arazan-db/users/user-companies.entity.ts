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
  id: number;

  @Column({ default: true })
  actif: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @OneToOne(() => UserEntity, { nullable: true })
  @JoinColumn()
  idoperateurcreation: UserEntity;

  @OneToOne(() => UserEntity,{ nullable: true })
  @JoinColumn()
  idoperateurlastupdate: UserEntity;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.userscompanies, {nullable: false})
  @JoinColumn({ name: 'refcompany' })
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, (userentity) => userentity.companiesusers, {nullable: false})
  @JoinColumn({ name: 'id' })
  user: UserEntity;
}
