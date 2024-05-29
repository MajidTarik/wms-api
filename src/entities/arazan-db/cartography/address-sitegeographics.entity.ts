import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
import {CompanyEntity} from "./company.entity";
import {CityEntity} from "./city.entity";
import {CountryEntity} from "./country.entity";
import {AddressEntity} from "./address.entity";
import {SitegeographyEntity} from "./sitegeography.entity";
import {AddressTypeEntity} from "./address-type.entity";
import {OrganisationEntity} from "./organisation.entity";

@Entity('addresssitegeographics')
export class AddressSitegeographicsEntity {
    @PrimaryColumn({length: 12})
    refaddress: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @PrimaryColumn()
    refsitegeographic: string;

    @PrimaryColumn()
    refaddresstype: string;

    @CreateDateColumn({type: 'timestamptz'})
    datetimecreation: Date;

    @UpdateDateColumn({type: 'timestamptz'})
    datetimelastupdate: Date;

    @ManyToOne(() => SitegeographyEntity, (sitegeographyentity) => sitegeographyentity.refsitegeographic, {nullable: false})
    @JoinColumn([
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
        {name: 'refsitegeographic', referencedColumnName: 'refsitegeographic'},
    ])
    sitegeographic: SitegeographyEntity;

    @ManyToOne(() => AddressEntity, (addressentity) => addressentity.refaddress, {nullable: false})
    @JoinColumn([
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
        {name: 'refaddress', referencedColumnName: 'refaddress'},
    ])
    address: AddressEntity;

    @ManyToOne(() => AddressTypeEntity, (addresstypeentity) => addresstypeentity.refaddresstype, {nullable: false})
    @JoinColumn([
        {name: 'refaddresstype', referencedColumnName: 'refaddresstype'},
    ])
    addresstype: AddressTypeEntity;

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
}
