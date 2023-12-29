import {
  Column,
  Entity,
  JoinColumn, ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { VendorEntity } from './vendor.entity';
import {CompanyEntity} from "../cartography/company.entity";

@Entity('paymentmethod')
export class PaymentmethodEntity {
  @PrimaryColumn()
  refpaymentmethod: string;

  @Column()
  paymentmethod: string;

  @PrimaryColumn()
  refcompany: string;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @OneToMany(() => VendorEntity, (vendorentity) => vendorentity.refpaymentmethod)
  @JoinColumn([
    { name: 'refpaymentmethod', referencedColumnName: 'refpaymentmethod' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  vendors: VendorEntity[];
}
