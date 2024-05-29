import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { CompanyEntity } from '../cartography/company.entity';
import { OrganisationEntity } from "../cartography/organisation.entity";
import { ItemsreleasedEntity } from "./itemsreleased.entity";

@Entity('pricemodel')
export class PricemodelEntity {
  @PrimaryColumn()
  refpricemodel: string;

  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  reforganisation: string;

  @Column()
  pricemodel: string;

  @Column()
  actif: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
  @JoinColumn([
    { name: 'refcompany', referencedColumnName: 'refcompany'},
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  company: CompanyEntity;

  @ManyToOne(() => OrganisationEntity, (organisationentity) => organisationentity.reforganisation, {nullable: false})
  @JoinColumn([
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  organisation: OrganisationEntity;

  @OneToMany(() => ItemsreleasedEntity, (itemsreleased) => itemsreleased.pricemodel)
  @JoinColumn([
    { name: 'refpricemodel', referencedColumnName: 'refpricemodel' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'reforganisation', referencedColumnName: 'reforganisation'},
  ])
  itemsreleased: ItemsreleasedEntity[];
}
