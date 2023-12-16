import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import {ParametresEntity} from "../parametres/parametres.entity";
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
