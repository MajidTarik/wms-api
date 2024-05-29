import {
    Column,
    Entity,
    PrimaryColumn,
} from 'typeorm';

@Entity('itemtracking')
export class ItemtrackingEntity {
    @PrimaryColumn()
    refitemtracking: string;

    @Column()
    itemtracking: string;
}
