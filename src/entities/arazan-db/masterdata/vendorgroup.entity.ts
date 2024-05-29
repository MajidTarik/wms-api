import {
  Column,
  Entity,
  JoinColumn, ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import {CompanyEntity} from "../cartography/company.entity";
import {VendorreleasedEntity} from "./vendorreleased.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('vendorgroup')
export class VendorgroupEntity {
  @PrimaryColumn()
  refvendorgroup: string;

  @Column()
  vendorgroup: string;

  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  reforganisation: string;

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

  @OneToMany(() => VendorreleasedEntity, (vendorreleased) => vendorreleased.refvendorgroup)
  @JoinColumn([
    { name: 'refvendorgroup', referencedColumnName: 'refvendorgroup' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation' },
  ])
  vendorreleased: VendorreleasedEntity[];
}
