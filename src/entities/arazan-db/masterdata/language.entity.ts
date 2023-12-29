import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { VendorEntity } from './vendor.entity';

@Entity('language')
export class LanguageEntity {
  @PrimaryColumn()
  reflanguage: string;

  @Column()
  language: string;

  @OneToMany(() => VendorEntity, (vendorentity) => vendorentity.language)
  @JoinColumn([
    { name: 'reflanguage', referencedColumnName: 'reflanguage' },
  ])
  vendors: VendorEntity[];
}
