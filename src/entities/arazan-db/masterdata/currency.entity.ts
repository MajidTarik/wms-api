import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { VendorEntity } from './vendor.entity';

@Entity('currency')
export class CurrencyEntity {
  @PrimaryColumn()
  refcurrency: string;

  @Column()
  currency: string;

  @OneToMany(() => VendorEntity, (vendorentity) => vendorentity.currency)
  @JoinColumn([
    { name: 'refcurrency', referencedColumnName: 'refcurrency' },
  ])
  vendors: VendorEntity[];
}
