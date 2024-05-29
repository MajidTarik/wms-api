import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('items')
export class ItemsEntity {
  @PrimaryColumn()
  refitem: string;

  @PrimaryColumn()
  reforganisation: string;

  @Column()
  item: string;

  @Column({ nullable: true })
  barcode: string;

  @Column({ nullable: true })
  itemdescription: string;

  @Column({ nullable: true })
  searchname: string;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => OrganisationEntity, (organisationentity) => organisationentity.reforganisation, { nullable: false })
  @JoinColumn([
    {name: 'reforganisation', referencedColumnName: 'reforganisation' },
  ])
  organisation: OrganisationEntity;
}
