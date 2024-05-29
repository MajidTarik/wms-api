import {
    Entity,
    JoinColumn, ManyToOne,
    PrimaryColumn
} from 'typeorm';
import {CompanyEntity} from "../cartography/company.entity";
import {TaxeEntity} from "./taxe.entity";
import {TaxeGroupEntity} from "./taxe-group.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('taxebygroup')
export class TaxeByGroupEntity {
    @PrimaryColumn()
    reftaxegroup: string;

    @PrimaryColumn()
    reftaxe: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

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

    @ManyToOne(() => TaxeEntity, (taxeentity) => taxeentity.reftaxe, {nullable: false})
    @JoinColumn([
        {name: 'reftaxe', referencedColumnName: 'reftaxe'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    taxe: TaxeEntity;

    @ManyToOne(() => TaxeGroupEntity, (taxegroupentity) => taxegroupentity.reftaxegroup, {nullable: false})
    @JoinColumn([
        {name: 'reftaxegroup', referencedColumnName: 'reftaxegroup'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    taxegroup: TaxeGroupEntity;
}
