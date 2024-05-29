import {
    Column,
    Entity, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import {AddressEntity} from "./address.entity";
import {CountryEntity} from "./country.entity";

@Entity('city')
export class CityEntity {
    @PrimaryColumn()
    refcity: string;

    @Column()
    refcountry: string;

    @Column()
    city: string;

    @OneToMany(() => AddressEntity, (adressentity) => adressentity.city)
    adress: AddressEntity[];

    @ManyToOne(() => CountryEntity, (countryentity) => countryentity.cities, {nullable: false})
    @JoinColumn([{name: 'refcountry', referencedColumnName: 'refcountry'}])
    country: CountryEntity[];
}
