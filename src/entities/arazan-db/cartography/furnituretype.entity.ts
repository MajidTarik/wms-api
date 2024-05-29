import {
    Column,
    Entity,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import {AisleEntity} from "./aisle.entity";

@Entity('furnituretype')
export class FurnituretypeEntity {
    @PrimaryColumn()
    reffurnituretype: string;

    @Column()
    furnituretype: string;

    @OneToMany(() => AisleEntity, (aisleentity) => aisleentity.furnituretype)
    aisles: AisleEntity[];
}
