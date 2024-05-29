import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import {CompanyEntity} from "../cartography/company.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";
import {UserCompaniesEntity} from "./user-companies.entity";
import {WarehouseEntity} from "../cartography/warehouse.entity";

@Entity('usercompanywarehouses')
export class UserCompaniesWarehousesEntity {
    @PrimaryColumn()
    reforganisation: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    matricule: string;

    @PrimaryColumn()
    refwarehouse: string;

    @Column({default: false})
    canrequestpurchase: boolean;

    @Column({default: false})
    canreceipt: boolean;

    @Column({default: true})
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

    @ManyToOne(() => UserCompaniesEntity, (userentity) => userentity.matricule, {nullable: false})
    @JoinColumn([
        {name: 'matricule', referencedColumnName: 'matricule'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
    ])
    user: UserCompaniesEntity;


    @ManyToOne(() => WarehouseEntity, (warehouseentity) => warehouseentity.refwarehouse, {nullable: false})
    @JoinColumn([
        {name: 'refwarehouse', referencedColumnName: 'refwarehouse'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
    ])
    warehouse: WarehouseEntity;
}
