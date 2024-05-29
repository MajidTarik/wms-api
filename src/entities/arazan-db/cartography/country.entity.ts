import {
    Column,
    Entity,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import {AddressEntity} from "./address.entity";
import {CityEntity} from "./city.entity";

@Entity('country')
export class CountryEntity {
    @PrimaryColumn()
    refcountry: string;

    @Column()
    country: string;

    @OneToMany(() => AddressEntity, (adressentity) => adressentity.country)
    adress: AddressEntity[];

    @OneToMany(() => CityEntity, (cityentity) => cityentity.country)
    cities: CityEntity[];
}
