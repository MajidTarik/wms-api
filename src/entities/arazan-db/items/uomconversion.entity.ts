import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import {CompanyEntity} from '../cartography/company.entity';
import {UnitsEntity} from './units.entity';
import {OrganisationEntity} from "../cartography/organisation.entity";
import {ItemsreleasedEntity} from "./itemsreleased.entity";

@Entity('uomconversion')
export class UomconversionEntity {
    @PrimaryColumn()
    refitem: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @PrimaryColumn()
    refunitfrom: string;

    @PrimaryColumn()
    refunitto: string;

    @Column({type: "decimal", precision: 7, scale: 2, default: 0})
    coefficient: number;

    @Column()
    actif: boolean;

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

    @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, {nullable: false})
    @JoinColumn([
        {name: 'refunitfrom', referencedColumnName: 'refunit'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    unitfrom: UnitsEntity;

    @ManyToOne(() => UnitsEntity, (unitsentity) => unitsentity.refunit, {nullable: false})
    @JoinColumn([
        {name: 'refunitto', referencedColumnName: 'refunit'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    unitto: UnitsEntity;

    @ManyToOne(() => ItemsreleasedEntity, (itemsreleased) => itemsreleased.refitem, {nullable: false})
    @JoinColumn([
        {name: 'refitem', referencedColumnName: 'refitem'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    itemsreleased: ItemsreleasedEntity;
}
