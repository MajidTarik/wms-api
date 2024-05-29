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
import {OrganisationEntity} from "./organisation.entity";

@Entity('address')
@Unique(['title'])
export class AddressEntity {
    @PrimaryColumn({length: 12})
    refaddress: string;

    @Column()
    title: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @Column()
    location: string;

    @Column()
    refcity: string;

    @Column()
    state: string;

    @Column()
    zipcode: string;

    @Column()
    refcountry: string;

    @Column({default: true})
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
    @JoinColumn([{name: 'reforganisation', referencedColumnName: 'reforganisation'}])
    organisation: OrganisationEntity;

    @ManyToOne(() => CityEntity, (citiesentity) => citiesentity.refcity, {nullable: false})
    @JoinColumn([{name: 'refcity', referencedColumnName: 'refcity'}])
    city: CityEntity;

    @ManyToOne(() => CountryEntity, (countryentity) => countryentity.refcountry, {nullable: false})
    @JoinColumn([{name: 'refcountry', referencedColumnName: 'refcountry'}])
    country: CountryEntity;
}
