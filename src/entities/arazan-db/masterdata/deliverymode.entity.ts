import {
  Column,
  Entity,
  JoinColumn, ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { VendorEntity } from './vendor.entity';
import {CompanyEntity} from "../cartography/company.entity";

@Entity('deliverymode')
export class DeliverymodeEntity {
  @PrimaryColumn()
  refdeliverymode: string;

  @Column()
  deliverymode: string;

  @PrimaryColumn()
  refcompany: string;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @OneToMany(() => VendorEntity, (Vendorentity) => Vendorentity.deliverymode)
  @JoinColumn([
    { name: 'refdeliverymode', referencedColumnName: 'refdeliverymode' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  vendors: VendorEntity[];
}
