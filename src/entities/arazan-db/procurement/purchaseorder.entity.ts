import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn, PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {CompanyEntity} from '../cartography/company.entity';
import {PurchaseorderStatutsEntity} from "./purchaseorder-statuts.entity";
import {PurchaseorderLinesEntity} from "./purchaseorder-lines.entity";
import {PurchaserequisitionEntity} from "./purchaserequisition.entity";
import {CurrencyEntity} from "../masterdata/currency.entity";
import {TaxeGroupEntity} from "../masterdata/taxe-group.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";
import {VendorreleasedEntity} from "../masterdata/vendorreleased.entity";

@Entity('purchaseorder')
export class PurchaseorderEntity {
    @PrimaryColumn()
    refpurchaseorder: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @Column()
    refpurchaseorderstatuts: string;

    @Column()
    refvendor: string;

    @Column()
    refpurchaserequisition: string;

    @Column()
    refcurrency: string;

    @Column()
    reftaxegroup: string;

    @CreateDateColumn({type: 'timestamptz'})
    datetimecreation: Date;

    @UpdateDateColumn({type: 'timestamptz'})
    datetimelastupdate: Date;

    @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
    @JoinColumn([
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    company: CompanyEntity;

    @ManyToOne(() => OrganisationEntity, (organisationentity) => organisationentity.reforganisation, {nullable: false})
    @JoinColumn([
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    organisation: OrganisationEntity;

    @ManyToOne(() => PurchaseorderStatutsEntity, (purchaseorderStatutsentity) => purchaseorderStatutsentity.purchaseorders, {nullable: false})
    @JoinColumn([
        {name: 'refpurchaseorderstatuts', referencedColumnName: 'refpurchaseorderstatuts'},
    ])
    purchaseorderstatuts: PurchaseorderStatutsEntity;

    @OneToMany(() => PurchaseorderLinesEntity, (purchaseorderlinesEntity) => purchaseorderlinesEntity.purchaseorder)
    @JoinColumn([
        {name: 'refpurchaseorder', referencedColumnName: 'refpurchaseorder'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    purchaseorderlines: PurchaseorderLinesEntity[];

    @ManyToOne(() => VendorreleasedEntity, (vendorentity) => vendorentity.refvendor, {nullable: true})
    @JoinColumn([
        {name: 'refvendor', referencedColumnName: 'refvendor'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    vendor: VendorreleasedEntity;

    @ManyToOne(() => PurchaserequisitionEntity, (purchaserequisitionentity) => purchaserequisitionentity.refpurchaserequisition, {nullable: true})
    @JoinColumn([
        {name: 'refpurchaserequisition', referencedColumnName: 'refpurchaserequisition'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    purchaserequisition: PurchaserequisitionEntity;

    @ManyToOne(() => CurrencyEntity, (currencyentity) => currencyentity.refcurrency, {nullable: true})
    @JoinColumn([
        {name: 'refcurrency', referencedColumnName: 'refcurrency'},
    ])
    currency: CurrencyEntity;

    @ManyToOne(() => TaxeGroupEntity, (taxegroupEntity) => taxegroupEntity.reftaxegroup, {nullable: false})
    @JoinColumn([
        {name: 'reftaxegroup', referencedColumnName: 'reftaxegroup'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    taxegrouppurchorder: TaxeGroupEntity;
}
