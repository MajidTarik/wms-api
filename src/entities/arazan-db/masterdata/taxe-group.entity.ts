import {
    Column,
    Entity,
    JoinColumn, ManyToOne,
    OneToMany,
    PrimaryColumn
} from 'typeorm';
import {CompanyEntity} from "../cartography/company.entity";
import {TaxeByGroupEntity} from "./taxe-by-group.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('taxegroup')
export class TaxeGroupEntity {
    @PrimaryColumn()
    reftaxegroup: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @Column()
    taxegroup: string;

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

    @OneToMany(() => TaxeByGroupEntity, (taxebygroupentity) => taxebygroupentity.taxegroup, {nullable: false})
    @JoinColumn([
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reftaxegroup', referencedColumnName: 'reftaxegroup'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    taxes: TaxeByGroupEntity[];
}
