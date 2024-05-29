import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from '../cartography/company.entity';
import { ParametresLineEntity } from "./parametres-line.entity";
import { SitegeographyEntity } from "../cartography/sitegeography.entity";
import { ParametresTypesEntity } from "./parametres-types.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('parametresheaders')
@Unique(['refcompany', 'refheaderparametre', 'reforganisation'])
export class ParametresHeaderEntity {
  @PrimaryGeneratedColumn()
  idheaderparametre: number;

  @Column()
  refheaderparametre: string;

  @Column()
  refcompany: string;

  @Column()
  reforganisation: string;

  @Column()
  reftypeparametre: string;

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

  @OneToMany(() => ParametresLineEntity, (parametreslineentity) => parametreslineentity.parametresheaders)
  parametreslines: ParametresLineEntity[];

  @OneToMany(() => SitegeographyEntity, (sitegeographyentity) => sitegeographyentity.headerparametre, { nullable: false })
  @JoinColumn([{ name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' }])
  sitesgeographic: SitegeographyEntity[];

  @ManyToOne(() => ParametresTypesEntity, (parametrestypesentity) => parametrestypesentity.parametres, {nullable: false})
  @JoinColumn({ name: 'reftypeparametre' })
  parametrestype: ParametresTypesEntity;
}
