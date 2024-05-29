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
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('user')
@Unique(['login', 'reforganisation'])
@Unique(['email', 'reforganisation'])
export class UserEntity {
  @PrimaryColumn()
  reforganisation: string;

  @PrimaryColumn()
  matricule: string;

  @Column()
  login: string;
  
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

  @OneToMany(() => UserCompaniesEntity, (usercompaniesentity) => usercompaniesentity.user)
  @JoinColumn([
    { name: 'matricule', referencedColumnName: 'matricule' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation' },
  ])
  companiesusers: UserCompaniesEntity[];

  @ManyToOne(() => OrganisationEntity, (organisationentity) => organisationentity.reforganisation, {nullable: false})
  @JoinColumn([
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  organisation: OrganisationEntity;
}
