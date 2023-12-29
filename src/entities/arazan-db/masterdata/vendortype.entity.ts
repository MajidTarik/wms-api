import {
  Column,
  Entity,
  JoinColumn, ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { VendorEntity } from './vendor.entity';
import { CompanyEntity } from "../cartography/company.entity";

@Entity('vendortype')
export class VendortypeEntity {
  @PrimaryColumn()
  refvendortype: string;

  @Column()
  vendortype: string;

  @OneToMany(() => VendorEntity, (vendorentity) => vendorentity.vendortype)
  @JoinColumn([
    { name: 'refvendortype', referencedColumnName: 'refvendortype' },
  ])
  vendors: VendorEntity[];
}
