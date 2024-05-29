import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { VendorEntity } from './vendor.entity';

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
