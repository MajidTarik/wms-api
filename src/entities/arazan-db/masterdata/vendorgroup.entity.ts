import {
  Column,
  Entity,
  JoinColumn, ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { VendorEntity } from './vendor.entity';
import {CompanyEntity} from "../cartography/company.entity";

@Entity('vendorgroup')
export class VendorgroupEntity {
  @PrimaryColumn()
  refvendorgroup: string;

  @Column()
  vendorgroup: string;

  @PrimaryColumn()
  refcompany: string;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @OneToMany(() => VendorEntity, (vendorentity) => vendorentity.refvendorgroup)
  @JoinColumn([
    { name: 'refvendorgroup', referencedColumnName: 'refvendorgroup' },
    { name: 'refcompany', referencedColumnName: 'refcompany' }
  ])
  vendors: VendorEntity[];
}
