import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, ManyToOne, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UserCompaniesEntity } from "./user-companies.entity";
import { ParametresAttributEntity } from "../parametres/parametres-attribut.entity";
import { CompanyEntity } from "../cartography/company.entity";
import { ParametresTypesEntity } from "../parametres/parametres-types.entity";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({unique: true})
  login: string;

  @Column({nullable: true})
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

  @OneToOne(() => UserEntity)
  @JoinColumn()
  idoperateurcreation: UserEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  idoperateurlastupdate: UserEntity;
  
  @Column()
  lastname: string;
  
  @Column()
  firstname: string;
  
  @Column({unique: true})
  email: string;
  
  @Column({unique: true})
  matricule: string;

  @OneToMany(() => UserCompaniesEntity, (usercompaniesentity) => usercompaniesentity.user)
  @JoinColumn({ name: 'id' })
  companiesusers: UserCompaniesEntity[];

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.users, {nullable: false})
  @JoinColumn({ name: 'refcompany' })
  company: CompanyEntity;
}
