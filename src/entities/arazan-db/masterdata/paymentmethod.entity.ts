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

@Entity('paymentmethod')
export class PaymentmethodEntity {
  @PrimaryColumn()
  refpaymentmethod: string;

  @Column()
  paymentmethod: string;

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

  @OneToMany(() => VendorreleasedEntity, (vendorentity) => vendorentity.refpaymentmethod)
  @JoinColumn([
    { name: 'refpaymentmethod', referencedColumnName: 'refpaymentmethod' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  vendorreleased: VendorreleasedEntity[];
}
