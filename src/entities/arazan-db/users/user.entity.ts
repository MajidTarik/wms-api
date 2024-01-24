import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, ManyToOne, OneToMany,
  OneToOne, PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn, Unique
} from "typeorm";
import { UserCompaniesEntity } from "./user-companies.entity";
import { ParametresAttributEntity } from "../parametres/parametres-attribut.entity";
import { CompanyEntity } from "../cartography/company.entity";
import { ParametresTypesEntity } from "../parametres/parametres-types.entity";

@Entity('user')
@Unique(['login', 'refcompany'])
@Unique(['email', 'refcompany'])
export class UserEntity {
  @Column()
  login: string;

  @PrimaryColumn()
  refcompany: string;
  
  @Column()
  pwd: string;
  
  @Column()
  actif: boolean;
  
  // @Column({type: 'timestamptz', default: () => "CURRENT_TIMESTAMP"})
  @CreateDateColumn({type: 'timestamptz'})
  datetimecreation: Date;
  
  //@Column({type: 'timestamptz', default: () => "CURRENT_TIMESTAMP"})
  @UpdateDateColumn({type: 'timestamptz'})
  datetimelastupdate: Date;
  
  @Column()
  lastname: string;
  
  @Column()
  firstname: string;
  
  @Column()
  email: string;
  
  @PrimaryColumn()
  matricule: string;

  @OneToMany(() => UserCompaniesEntity, (usercompaniesentity) => usercompaniesentity.user)
  @JoinColumn([
    { name: 'matricule', referencedColumnName: 'matricule' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  companiesusers: UserCompaniesEntity[];

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.users, {nullable: false})
  @JoinColumn({ name: 'refcompany' })
  company: CompanyEntity;
}
