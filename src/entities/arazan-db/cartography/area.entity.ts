import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { CompanyEntity } from "./company.entity";
import { ParametresHeaderEntity } from "../parametres/parametres-header.entity";
import { WarehouseEntity } from "./warehouse.entity";

@Entity('area')
export class AreaEntity {
  @PrimaryColumn()
  refarea: string;

  @Column()
  area: string;

  @PrimaryColumn()
  refcompany: string;

  @Column()
  refwarehouse: string;

  @Column()
  actif: boolean;

  @Column()
  idheaderparametre: number;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, { nullable: false })
  @JoinColumn([{ name: 'idheaderparametre', referencedColumnName: 'idheaderparametre' }])
  headerparametre: ParametresHeaderEntity;

  @ManyToOne(() => WarehouseEntity, (warehouseentity) => warehouseentity.refwarehouse, { nullable: false })
  @JoinColumn([
    { name: 'refwarehouse', referencedColumnName: 'refwarehouse' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  warehouse: WarehouseEntity;

}
