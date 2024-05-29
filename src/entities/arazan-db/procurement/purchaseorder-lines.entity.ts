import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn, Unique
} from 'typeorm';
import {CompanyEntity} from '../cartography/company.entity';
import {ParametresHeaderEntity} from "../parametres/parametres-header.entity";
import {PurchaseorderEntity} from "./purchaseorder.entity";
import {PurchaserequisitionLinesEntity} from "./purchaserequisition-lines.entity";
import {ItemsreleasedEntity} from "../items/itemsreleased.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('purchaseorderlines')
export class PurchaseorderLinesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    idlinepurchaserequisition: number;

    @Column()
    refpurchaseorder: string;

    @Column()
    refcompany: string;

    @Column()
    reforganisation: string;

    @Column()
    refitem: string;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    quantity: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    price: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    lineamountttcvalue: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    lineamounttvavalue: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    lineamounthtvalue: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    linepricehtvalue: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    linepricettcvalue: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    discountvalue: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    discountpercentage: number;

    @Column({nullable: false})
    reftaxe: string;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    taxevalue: number;

    @Column({nullable: true})
    idheaderparametre: number;

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

    @ManyToOne(() => PurchaseorderEntity, (purchaseorderEntity) => purchaseorderEntity.purchaseorderlines, {nullable: false})
    @JoinColumn([
        {name: 'refpurchaseorder', referencedColumnName: 'refpurchaseorder'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    purchaseorder: PurchaseorderEntity;

    @ManyToOne(() => ItemsreleasedEntity, (itemsEntity) => itemsEntity.refitem, {nullable: false})
    @JoinColumn([
        {name: 'refitem', referencedColumnName: 'refitem'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    itemsreleased: ItemsreleasedEntity;

    @ManyToOne(() => PurchaserequisitionLinesEntity, (purchaserequisitionLinesEntity) => purchaserequisitionLinesEntity.id, {nullable: false})
    @JoinColumn([
        {name: 'idlinepurchaserequisition', referencedColumnName: 'id'},
    ])
    purchaserequisitionline: PurchaserequisitionLinesEntity;

}
