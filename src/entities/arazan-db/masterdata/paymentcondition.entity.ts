import {
  Column,
  Entity,
  JoinColumn, ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { VendorEntity } from './vendor.entity';
import { CompanyEntity } from "../cartography/company.entity";
import { Modepaiment } from "../../../helpers/modepaiment";

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

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @OneToMany(() => VendorEntity, (vendorentity) => vendorentity.refpaymentcondition)
  @JoinColumn([
    { name: 'refpaymentcondition', referencedColumnName: 'refpaymentcondition' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  vendors: VendorEntity[];
}
