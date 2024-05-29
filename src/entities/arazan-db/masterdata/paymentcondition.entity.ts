import {
  Column,
  Entity,
  JoinColumn, ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { CompanyEntity } from "../cartography/company.entity";
import { Modepaiment } from "../../../helpers/modepaiment";
import {OrganisationEntity} from "../cartography/organisation.entity";
import {VendorreleasedEntity} from "./vendorreleased.entity";

@Entity('paymentcondition')
export class PaymentconditionEntity {
  @PrimaryColumn()
  refpaymentcondition: string;

  @Column()
  paymentcondition: string;

  @Column()
  months: number;

  @Column()
  days: number;

  @Column()
  modepaiement: Modepaiment;

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

  @OneToMany(() => VendorreleasedEntity, (vendorentity) => vendorentity.refpaymentcondition)
  @JoinColumn([
    { name: 'refpaymentcondition', referencedColumnName: 'refpaymentcondition' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  vendors: VendorreleasedEntity[];
}
