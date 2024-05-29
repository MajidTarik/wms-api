import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {CompanyEntity} from "./company.entity";
import {ParametresHeaderEntity} from "../parametres/parametres-header.entity";
import {WarehouseEntity} from "./warehouse.entity";
import {OrganisationEntity} from "./organisation.entity";

@Entity('area')
export class AreaEntity {
    @PrimaryColumn()
    refarea: string;

    @Column()
    area: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @Column()
    refwarehouse: string;

    @Column()
    actif: boolean;

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

    @ManyToOne(() => WarehouseEntity, (warehouseentity) => warehouseentity.refwarehouse, {nullable: false})
    @JoinColumn([
        {name: 'refwarehouse', referencedColumnName: 'refwarehouse'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    warehouse: WarehouseEntity;
}
