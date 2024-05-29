import {
  Column,
  Entity,
  JoinColumn, ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import {CompanyEntity} from "../cartography/company.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";
import {VendorreleasedEntity} from "./vendorreleased.entity";

@Entity('deliverymode')
export class DeliverymodeEntity {
  @PrimaryColumn()
  refdeliverymode: string;

  @Column()
  deliverymode: string;

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

  @OneToMany(() => VendorreleasedEntity, (Vendorentity) => Vendorentity.deliverymode)
  @JoinColumn([
    { name: 'refdeliverymode', referencedColumnName: 'refdeliverymode' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  vendorreleased: VendorreleasedEntity[];
}
