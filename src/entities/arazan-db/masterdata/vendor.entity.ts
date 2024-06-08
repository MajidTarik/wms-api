import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { CurrencyEntity } from "./currency.entity";
import { VendortypeEntity } from "./vendortype.entity";
import { LanguageEntity } from "./language.entity";
import { OrganisationEntity } from "../cartography/organisation.entity";

@Entity('vendor')
export class VendorEntity {
  @PrimaryColumn()
  refvendor: string;

  @PrimaryColumn()
  reforganisation: string;

  @Column({ nullable: false })
  refvendortype: string;

  @Column({ nullable: true })
  prenom: string;

  @Column({ nullable: false })
  nom: string;

  @Column({ nullable: true, unique: true })
  ice: string;

  @Column({ nullable: true, unique: true })
  if: string;

  @Column({ nullable: true, unique: true })
  rc: string;

  @Column({ nullable: true, unique: true })
  patente: string;

  @Column({ nullable: true, unique: true })
  cnss: string;

  @Column({ nullable: true, unique: true })
  ncin: string;

  @Column({ nullable: true })
  contactdescription: string;

  @Column({ nullable: true })
  contactmail: string;

  @Column({ nullable: true })
  contacttelephone: string;

  @Column({ nullable: false })
  refcurrency: string;

  @Column({ nullable: true })
  refvendorinvoicing: string;

  @Column({ nullable: false })
  reflanguage: string;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => OrganisationEntity, (organisationentity) => organisationentity.reforganisation, {nullable: false})
  @JoinColumn([
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  organisation: OrganisationEntity;

  @ManyToOne(() => CurrencyEntity, (currencyentity) => currencyentity.refcurrency, { nullable: false })
  @JoinColumn([
    { name: 'refcurrency', referencedColumnName: 'refcurrency' },
  ])
  currency: CurrencyEntity;

  @ManyToOne(() => VendortypeEntity, (vendortypeentity) => vendortypeentity.refvendortype, { nullable: false })
  @JoinColumn([
    { name: 'refvendortype', referencedColumnName: 'refvendortype' },
  ])
  vendortype: VendortypeEntity;

  @ManyToOne(() => LanguageEntity, (languageentity) => languageentity.reflanguage, { nullable: false })
  @JoinColumn([
    { name: 'reflanguage', referencedColumnName: 'reflanguage' },
  ])
  language: LanguageEntity;

  @ManyToOne(() => VendorEntity, (vendorentity) => vendorentity.refvendorinvoicing, {nullable: true})
  @JoinColumn([
    { name: 'refvendorinvoicing', referencedColumnName: 'refvendor' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation' },
  ])
  vendorinvoicing: VendorEntity;
}
