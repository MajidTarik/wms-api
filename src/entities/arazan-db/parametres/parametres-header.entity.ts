import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn
} from "typeorm";
import { CompanyEntity } from '../cartography/company.entity';
import { ParametresLineEntity } from "./parametres-line.entity";
import { SitegeographyEntity } from "../cartography/sitegeography.entity";

@Entity('parametresheaders')
@Unique(['refcompany', 'refheaderparametre'])
export class ParametresHeaderEntity {
  @PrimaryGeneratedColumn()
  idheaderparametre: number;

  @Column()
  refheaderparametre: string;

  @Column()
  refcompany: string;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
  @JoinColumn([
    { name: 'refcompany', referencedColumnName: 'refcompany' }
  ])
  company: CompanyEntity;

  @OneToMany(() => ParametresLineEntity, (parametreslineentity) => parametreslineentity.parametresheaders)
  parametreslines: ParametresLineEntity[];

  @OneToMany(() => SitegeographyEntity, (sitegeographyentity) => sitegeographyentity.headerparametre, { nullable: false })
  @JoinColumn([{ name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' }])
  sitesgeographic: SitegeographyEntity[];

}
