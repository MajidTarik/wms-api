import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { CompanyEntity } from '../cartography/company.entity';
import { ParametresHeaderEntity } from "../parametres/parametres-header.entity";
import { VendorgroupEntity } from "./vendorgroup.entity";
import { DeliverymodeEntity } from "./deliverymode.entity";
import { PaymentconditionEntity } from "./paymentcondition.entity";
import { PaymentmethodEntity } from "./paymentmethod.entity";
import { TaxeGroupEntity } from "./taxe-group.entity";
import { OrganisationEntity } from "../cartography/organisation.entity";
import {VendorEntity} from "./vendor.entity";

@Entity('vendorreleased')
export class VendorreleasedEntity {
  @PrimaryColumn()
  refvendor: string;

  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  reforganisation: string;

  @Column({ nullable: true })
  refvendorgroup: string;

  @Column({ nullable: true })
  refdeliverymode: string;

  @Column({ nullable: true })
  refpaymentcondition: string;

  @Column({ nullable: true })
  refpaymentmethod: string;

  @Column({ nullable: true })
  idheaderparametre: number;

  @Column({ nullable: true })
  reftaxegroup: string;

  @Column({ default: false })
  bloqued: boolean;

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

  @ManyToOne(() => VendorEntity, (vendorentity) => vendorentity.refvendor, {nullable: false})
  @JoinColumn([
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
    { name: 'refvendor', referencedColumnName: 'refvendor'},
  ])
  vendor: VendorEntity;

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, { nullable: false })
  @JoinColumn([{ name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' }])
  headerparametre: ParametresHeaderEntity;

  @ManyToOne(() => VendorgroupEntity, (vendorgroupentity) => vendorgroupentity.refvendorgroup, { nullable: false })
  @JoinColumn([
    { name: 'refvendorgroup', referencedColumnName: 'refvendorgroup' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  vendorgroup: VendorgroupEntity;

  @ManyToOne(() => DeliverymodeEntity, (deliverymodeEntity) => deliverymodeEntity.refdeliverymode, {nullable: false})
  @JoinColumn([
    { name: 'refdeliverymode', referencedColumnName: 'refdeliverymode' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  deliverymode: DeliverymodeEntity;


  @ManyToOne(() => PaymentconditionEntity, (paymentconditionentity) => paymentconditionentity.refpaymentcondition, {nullable: false})
  @JoinColumn([
    { name: 'refpaymentcondition', referencedColumnName: 'refpaymentcondition' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  paymentcondition: PaymentconditionEntity;

  @ManyToOne(() => PaymentmethodEntity, (paymentmethodentity) => paymentmethodentity.refpaymentmethod, {nullable: false})
  @JoinColumn([
    { name: 'refpaymentmethod', referencedColumnName: 'refpaymentmethod' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  paymentmethod: PaymentmethodEntity;

  @ManyToOne(() => TaxeGroupEntity, (taxegroupentity) => taxegroupentity.reftaxegroup, {nullable: true})
  @JoinColumn([
    { name: 'reftaxegroup', referencedColumnName: 'reftaxegroup' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  taxegroup: TaxeGroupEntity;
}
