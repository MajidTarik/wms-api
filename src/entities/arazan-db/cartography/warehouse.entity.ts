import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { CompanyEntity } from "./company.entity";
import { ParametresHeaderEntity } from "../parametres/parametres-header.entity";
import { SitegeographyEntity } from "./sitegeography.entity";

@Entity('warehouse')
export class WarehouseEntity {
  @PrimaryColumn()
  refwarehouse: string;

  @Column()
  warehouse: string;

  @PrimaryColumn()
  refcompany: string;

  @Column()
  refsitegeographic: string;

  @Column()
  actif: boolean;

  @Column()
  idheaderparametre: number;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => UserEntity)
  idoperateurcreation: UserEntity;

  @ManyToOne(() => UserEntity)
  idoperateurlastupdate: UserEntity;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, { nullable: false })
  @JoinColumn([{ name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' }])
  headerparametre: ParametresHeaderEntity;

  @ManyToOne(() => SitegeographyEntity, (sitegeographyentity) => sitegeographyentity.refsitegeographic, { nullable: false })
  @JoinColumn([
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'refsitegeographic', referencedColumnName: 'refsitegeographic' }
  ])
  sitegeographic: SitegeographyEntity;

}
