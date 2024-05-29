import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {CompanyEntity} from '../cartography/company.entity';
import {PurchaserequisitionEntity} from "./purchaserequisition.entity";
import {ParametresHeaderEntity} from "../parametres/parametres-header.entity";
import {CurrencyEntity} from "../masterdata/currency.entity";
import {TaxeEntity} from "../masterdata/taxe.entity";
import {TaxeGroupEntity} from "../masterdata/taxe-group.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";
import {ItemsreleasedEntity} from "../items/itemsreleased.entity";
import {VendorreleasedEntity} from "../masterdata/vendorreleased.entity";

@Entity('purchaserequisitionlines')
export class PurchaserequisitionLinesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    refvendor: string;

    @Column()
    refpurchaserequisition: string;

    @Column()
    refcompany: string;

    @Column()
    reforganisation: string;

    @Column({nullable: true})
    refitem: string;

    @Column({nullable: true})
    refvariant: string;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    quantity: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    price: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    discountvalue: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    discountpercentage: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    lineamounthtvalue: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    linepricehtvalue: number;

    @Column({nullable: true})
    idheaderparametre: number;

    @Column({nullable: true})
    refcurrency: string;

    @Column({nullable: true})
    reftaxe: string;

    @Column({nullable: true, type: "decimal", precision: 10, scale: 2, default: 0})
    taxevalue: number;

    @Column({nullable: true, type: "decimal", precision: 10, scale: 2, default: 0})
    linepricettcvalue: number;

    @Column({nullable: true, type: "decimal", precision: 10, scale: 2, default: 0})
    lineamountttcvalue: number;

    @Column({nullable: true, type: "decimal", precision: 10, scale: 2, default: 0})
    lineamounttvavalue: number;

    @Column({nullable: true})
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

    @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, {nullable: false})
    @JoinColumn([{name: 'idheaderparametre', referencedColumnName: 'idheaderparametre'}])
    headerparametre: ParametresHeaderEntity;

    @ManyToOne(() => PurchaserequisitionEntity, (purchaserequisitionEntity) => purchaserequisitionEntity.purchaserequisitionlines, {nullable: false})
    @JoinColumn([
        {name: 'refpurchaserequisition', referencedColumnName: 'refpurchaserequisition'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    purchaserequisition: PurchaserequisitionEntity;

    @ManyToOne(() => ItemsreleasedEntity, (itemsEntity) => itemsEntity.purchaserequisitionlines, {nullable: false})
    @JoinColumn([
        {name: 'refitem', referencedColumnName: 'refitem'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    itemsreleased: ItemsreleasedEntity;

    @ManyToOne(() => VendorreleasedEntity, (vendorentity) => vendorentity.refvendor, {nullable: true})
    @JoinColumn([
        {name: 'refvendor', referencedColumnName: 'refvendor'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    vendor: VendorreleasedEntity;

    @ManyToOne(() => CurrencyEntity, (currencyentity) => currencyentity.refcurrency, {nullable: true})
    @JoinColumn([
        {name: 'refcurrency', referencedColumnName: 'refcurrency'},
    ])
    currency: CurrencyEntity;

    @ManyToOne(() => TaxeEntity, (taxeEntity) => taxeEntity.reftaxe, {nullable: false})
    @JoinColumn([
        {name: 'reftaxe', referencedColumnName: 'reftaxe'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    taxepurchreqline: TaxeEntity;

    @ManyToOne(() => TaxeGroupEntity, (taxegroupEntity) => taxegroupEntity.reftaxegroup, {nullable: false})
    @JoinColumn([
        {name: 'reftaxegroup', referencedColumnName: 'reftaxegroup'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    taxegrouppurchreqline: TaxeGroupEntity;
}
