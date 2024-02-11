import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { CompanyEntity } from '../cartography/company.entity';
import { ParametresHeaderEntity } from "../parametres/parametres-header.entity";
import { CurrencyEntity } from "./currency.entity";
import { VendortypeEntity } from "./vendortype.entity";
import { VendorgroupEntity } from "./vendorgroup.entity";
import { DeliverymodeEntity } from "./deliverymode.entity";
import { PaymentconditionEntity } from "./paymentcondition.entity";
import { PaymentmethodEntity } from "./paymentmethod.entity";
import { LanguageEntity } from "./language.entity";
import {TaxeGroupEntity} from "./taxe-group.entity";

@Entity('vendor')
export class VendorEntity {
  @PrimaryColumn()
  refvendor: string;

  @PrimaryColumn()
  refcompany: string;

  @Column({nullable: false})
  refvendortype: string;

  @Column()
  prenom: string;

  @Column()
  nom: string;

  @Column({nullable: false})
  refvendorgroup: string;

  @Column()
  ice: string;

  @Column()
  if: string;

  @Column()
  rc: string;

  @Column()
  patente: string;

  @Column()
  cnss: string;

  @Column()
  ncin: string;

  @Column()
  adresse: string;

  @Column()
  contactdescription: string;

  @Column()
  contactmail: string;

  @Column()
  contacttelephone: string;

  @Column({nullable: false})
  refcurrency: string;

  @Column({nullable: true})
  refvendorinvoicing: string;

  @Column({nullable: true})
  refdeliverymode: string;

  @Column({nullable: true})
  refpaymentcondition: string;

  @Column({nullable: true})
  refpaymentmethod: string;

  @Column()
  idheaderparametre: number;

  @Column({nullable: false})
  reflanguage: string;

  @Column({nullable: true})
  reftaxegroup: string;

  @Column()
  bloqued: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
  @JoinColumn({ name: 'refcompany' })
  company: CompanyEntity;

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, { nullable: false })
  @JoinColumn([{ name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' }])
  headerparametre: ParametresHeaderEntity;

  @ManyToOne(() => CurrencyEntity, (currencyentity) => currencyentity.refcurrency, {nullable: false})
  @JoinColumn([
    { name: 'refcurrency', referencedColumnName: 'refcurrency' },
  ])
  currency: CurrencyEntity;

  @ManyToOne(() => VendortypeEntity, (vendortypeentity) => vendortypeentity.refvendortype, {nullable: false})
  @JoinColumn([
    { name: 'refvendortype', referencedColumnName: 'refvendortype' },
  ])
  vendortype: VendortypeEntity;

  @ManyToOne(() => LanguageEntity, (languageentity) => languageentity.reflanguage, {nullable: false})
  @JoinColumn([
    { name: 'reflanguage', referencedColumnName: 'reflanguage' },
  ])
  language: LanguageEntity;

  @ManyToOne(() => VendorgroupEntity, (vendorgroupentity) => vendorgroupentity.refvendorgroup, {nullable: false})
  @JoinColumn([
    { name: 'refvendorgroup', referencedColumnName: 'refvendorgroup' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  vendorgroup: VendorgroupEntity;

  @ManyToOne(() => DeliverymodeEntity, (deliverymodeEntity) => deliverymodeEntity.refdeliverymode, {nullable: false})
  @JoinColumn([
    { name: 'refdeliverymode', referencedColumnName: 'refdeliverymode' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  deliverymode: DeliverymodeEntity;


  @ManyToOne(() => PaymentconditionEntity, (paymentconditionentity) => paymentconditionentity.refpaymentcondition, {nullable: false})
  @JoinColumn([
    { name: 'refpaymentcondition', referencedColumnName: 'refpaymentcondition' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  paymentcondition: PaymentconditionEntity;

  @ManyToOne(() => PaymentmethodEntity, (paymentmethodentity) => paymentmethodentity.refpaymentmethod, {nullable: false})
  @JoinColumn([
    { name: 'refpaymentmethod', referencedColumnName: 'refpaymentmethod' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  paymentmethod: PaymentmethodEntity;

  @ManyToOne(() => VendorEntity, (vendorentity) => vendorentity.refvendorinvoicing, {nullable: true})
  @JoinColumn([
    { name: 'refvendorinvoicing', referencedColumnName: 'refvendor' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  vendorinvoicing: VendorEntity;

  @ManyToOne(() => TaxeGroupEntity, (taxegroupentity) => taxegroupentity.reftaxegroup, {nullable: true})
  @JoinColumn([
    { name: 'reftaxegroup', referencedColumnName: 'reftaxegroup' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  taxegroup: TaxeGroupEntity;

  /**


  @ManyToOne(() => PaymentmethodEntity, (paymentmethodentity) => paymentmethodentity.refpaymentmethod, {nullable: false})
  @JoinColumn([
    { name: 'refvendorinvoicing', referencedColumnName: 'refvendorinvoicing' },
  ])
  vendorinvoicing: Vendorinvoicing;
   **/
}
