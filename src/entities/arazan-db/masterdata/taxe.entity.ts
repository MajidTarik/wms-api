import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryColumn
} from 'typeorm';
import {CompanyEntity} from '../cartography/company.entity';
import {CurrencyEntity} from './currency.entity';
import {TaxeLineEntity} from "./taxe-line.entity";
import {TaxeByGroupEntity} from "./taxe-by-group.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";
import {ItemsreleasedEntity} from "../items/itemsreleased.entity";

@Entity('taxe')
export class TaxeEntity {
    @PrimaryColumn()
    reftaxe: string;

    @Column()
    taxe: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @Column({nullable: true})
    refcurrency: string;

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

    @ManyToOne(() => CurrencyEntity, (currencyentity) => currencyentity.refcurrency, {nullable: true})
    @JoinColumn([
        {name: 'refcurrency', referencedColumnName: 'refcurrency'},
    ])
    currency: CurrencyEntity;

    @OneToMany(() => TaxeLineEntity, (taxevalueentity) => taxevalueentity.taxe, {nullable: true})
    @JoinColumn([
        {name: 'reftaxe', referencedColumnName: 'reftaxe'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    taxevalues: TaxeLineEntity[];

    @OneToMany(() => TaxeByGroupEntity, (tbgentity) => tbgentity.taxe, {nullable: true})
    @JoinColumn([
        {name: 'reftaxe', referencedColumnName: 'reftaxe'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    groupsbytaxe: TaxeByGroupEntity[];

    @OneToMany(() => ItemsreleasedEntity, (itemsreleased) => itemsreleased.taxesales, {nullable: true})
    @JoinColumn([
        {name: 'reftaxe', referencedColumnName: 'reftaxesales'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    taxeitemsales: ItemsreleasedEntity[];

    @OneToMany(() => ItemsreleasedEntity, (itemsreleased) => itemsreleased.taxepurchase, {nullable: true})
    @JoinColumn([
        {name: 'reftaxe', referencedColumnName: 'reftaxepurch'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    taxeitempurchase: ItemsreleasedEntity[];
}
