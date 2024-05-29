import {
    Column,
    Entity,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import {AddressEntity} from "./address.entity";

@Entity('addresstype')
export class AddressTypeEntity {
    @PrimaryColumn()
    refaddresstype: string;

    @Column()
    addresstype: string;

}
