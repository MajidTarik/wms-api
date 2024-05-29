import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import {CompanyEntity} from '../cartography/company.entity';
import {UnitsEntity} from './units.entity';
import {ParametresHeaderEntity} from '../parametres/parametres-header.entity';
import {PricemodelEntity} from './pricemodel.entity';
import {ItemtrackingEntity} from './itemtracking.entity';
import {PurchaserequisitionLinesEntity} from '../procurement/purchaserequisition-lines.entity';
import {TaxeEntity} from '../masterdata/taxe.entity';
import {CategoriesitemsEntity} from "../categories/categoriesitems.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('itemsreleased')
export class ItemsreleasedEntity {
    @PrimaryColumn()
    refitem: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @Column({default: false, nullable: true})
    stopedpurch: boolean;

    @Column({default: false, nullable: true})
    stopedsales: boolean;

    @Column({default: false, nullable: true})
    stopedinvent: boolean;

    @Column({default: 0, nullable: true})
    safetystock: number;

    @Column({nullable: true})
    refunitinvent: string;

    @Column({nullable: true})
    refunitsales: string;

    @Column({nullable: true})
    refunitpurch: string;

    @Column({nullable: true})
    refunitorder: string;

    @Column({default: 0, nullable: true})
    expirationdate: number;

    @Column({default: 0, nullable: true})
    bestbeforetime: number;

    @Column({default: 0, nullable: true})
    removaltime: number;

    @Column({default: 0, nullable: true})
    alerttime: number;

    @Column({nullable: true})
    refpricemodel: string;

    @Column({nullable: true})
    refitemtracking: string;

    @Column({nullable: true})
    reftaxepurchase: string;

    @Column({nullable: true})
    reftaxesales: string;

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

    @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, {nullable: true})
    @JoinColumn([
        {name: 'refunitinvent', referencedColumnName: 'refunit'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    unitinvent: UnitsEntity;

    @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, {nullable: true})
    @JoinColumn([
        {name: 'refunitsales', referencedColumnName: 'refunit'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    unitsales: UnitsEntity;

    @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, {nullable: true})
    @JoinColumn([
        {name: 'refunitpurch', referencedColumnName: 'refunit'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    unitpurch: UnitsEntity;

    @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, {nullable: true})
    @JoinColumn([
        {name: 'refunitorder', referencedColumnName: 'refunit'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    unitorder: UnitsEntity;

    @ManyToOne(() => PricemodelEntity, (pricemodelentity) => pricemodelentity.itemsreleased, {nullable: true})
    @JoinColumn([
        {name: 'refpricemodel', referencedColumnName: 'refpricemodel'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    pricemodel: PricemodelEntity;

    @ManyToOne(() => ItemtrackingEntity, (itemtrackingentity) => itemtrackingentity.refitemtracking, {nullable: true})
    @JoinColumn([
        {name: 'refitemtracking', referencedColumnName: 'refitemtracking'},
    ])
    itemtracking: ItemtrackingEntity;

    @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, {nullable: true})
    @JoinColumn([{name: 'idheaderparametre', referencedColumnName: 'idheaderparametre'},])
    headerparametre: ParametresHeaderEntity;

    @ManyToOne(() => TaxeEntity, (taxeentity) => taxeentity.taxeitemsales, {nullable: true})
    @JoinColumn([
        {name: 'reftaxesales', referencedColumnName: 'reftaxe'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    taxesales: TaxeEntity;

    @ManyToOne(() => TaxeEntity, (taxeentity) => taxeentity.taxeitempurchase, {nullable: true})
    @JoinColumn([
        {name: 'reftaxepurchase', referencedColumnName: 'reftaxe'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    taxepurchase: TaxeEntity;

    @OneToMany(() => PurchaserequisitionLinesEntity, (purchaserequisitionlinesEntity) => purchaserequisitionlinesEntity.itemsreleased, {nullable: true})
    @JoinColumn([
        {name: 'refitem', referencedColumnName: 'refitem'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    purchaserequisitionlines: PurchaserequisitionLinesEntity[];

    @OneToMany(() => CategoriesitemsEntity, (categoriesitemsentity) => categoriesitemsentity.itemrealesed, {nullable: true})
    @JoinColumn([
        {name: 'refitem', referencedColumnName: 'refitem'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    categoriesaffectation: CategoriesitemsEntity[];
}
