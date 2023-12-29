import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { CompanyEntity } from '../cartography/company.entity';

@Entity('itemtracking')
export class ItemtrackingEntity {
  @PrimaryColumn()
  refitemtracking: string;

  @Column()
  itemtracking: string;
}
