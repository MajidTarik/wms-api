import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { ParametresEntity } from "./parametres.entity";
import { UserEntity } from "../users/user.entity";
import { ParametresAttributEntity } from "./parametres-attribut.entity";
import { CompanyEntity } from "../cartography/company.entity";
import { ParametresHeaderEntity } from "./parametres-header.entity";

@Entity('parametreslines')
export class ParametresLineEntity {
  @PrimaryColumn()
  idheaderparametre: number;

  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  refparametre: string;

  @PrimaryColumn()
  value: string;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.parametreslines, {nullable: false})
  @JoinColumn([
    { name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' },
  ])
  parametresheaders: ParametresHeaderEntity;

  @ManyToOne(() => ParametresAttributEntity, (parametresattributentity) => parametresattributentity.parametreslines, {nullable: false})
  @JoinColumn([
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'refparametre', referencedColumnName: 'refparametre' },
    { name: 'value', referencedColumnName: 'value' },
  ])
  parametresattributs: ParametresAttributEntity;

  @OneToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
  @JoinColumn([
    { name: 'refcompany', referencedColumnName: 'refcompany' }
  ])
  company: CompanyEntity;
}
