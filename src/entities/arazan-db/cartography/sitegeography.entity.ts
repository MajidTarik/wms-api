import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import {CompanyEntity} from './company.entity';
import {ParametresHeaderEntity} from "../parametres/parametres-header.entity";
import {WarehouseEntity} from "./warehouse.entity";
import {OrganisationEntity} from "./organisation.entity";

@Entity('sitegeographic')
export class SitegeographyEntity {
    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    refsitegeographic: string;

    @PrimaryColumn()
    reforganisation: string;

    @Column()
    sitegeographic: string;

    @Column({nullable: true})
    description: string;

    @Column({default: true, nullable: false})
    actif: boolean;

    @Column({nullable: true})
    idheaderparametre: number;

    @CreateDateColumn({type: 'timestamptz'})
    datetimecreation: Date;

    @UpdateDateColumn({type: 'timestamptz'})
    datetimelastupdate: Date;

    @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, {nullable: false})
    @JoinColumn([
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    company: CompanyEntity;

    @ManyToOne(() => OrganisationEntity, (organisationentity) => organisationentity.reforganisation, {nullable: false})
    @JoinColumn([
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    organisation: OrganisationEntity;

    @ManyToOne(() => ParametresHeaderEntity, (parametresheaderentity) => parametresheaderentity.idheaderparametre, {nullable: false})
    @JoinColumn([{name: 'idheaderparametre', referencedColumnName: 'idheaderparametre'}])
    headerparametre: ParametresHeaderEntity;

    @OneToMany(() => WarehouseEntity, (warehouseEntity) => warehouseEntity.sitegeographic)
    @JoinColumn([
        {name: 'refsitegeographic', referencedColumnName: 'refsitegeographic'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    warehouses: WarehouseEntity[];
}
