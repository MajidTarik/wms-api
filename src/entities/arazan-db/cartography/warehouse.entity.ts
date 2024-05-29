import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import {CompanyEntity} from "./company.entity";
import {ParametresHeaderEntity} from "../parametres/parametres-header.entity";
import {SitegeographyEntity} from "./sitegeography.entity";
import {OrganisationEntity} from "./organisation.entity";
import {LocationEntity} from "./location.entity";

@Entity('warehouse')
export class WarehouseEntity {
    @PrimaryColumn()
    refwarehouse: string;

    @Column()
    warehouse: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @Column()
    refsitegeographic: string;

    @Column()
    actif: boolean;

    @Column({nullable: true})
    refdefaultreceivelocation: string;

    @Column({nullable: true})
    refdefaultreceiveaisle: string;

    @Column({nullable: true})
    refdefaultexpeditionlocation: string;

    @Column({nullable: true})
    refdefaultexpeditionaisle: string;

    @Column({nullable: true})
    refdefaultgoodsfabricationlocation: string;

    @Column({nullable: true})
    refdefaultgoodsfabricationaisle: string;

    @Column({nullable: true})
    refdefaultrawmaterialconsumptionlocation: string;

    @Column({nullable: true})
    refdefaultrawmaterialconsumptionaisle: string;

    @Column({nullable: true})
    refdefaultreturnlocation: string;

    @Column({nullable: true})
    refdefaultreturnaisle: string;

    @Column({nullable: true, default: false})
    negativephysicalstock: boolean;

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

    @ManyToOne(() => LocationEntity, (locationrentity) => locationrentity.reflocation, {nullable: true})
    @JoinColumn([
        {name: 'refdefaultreceivelocation', referencedColumnName: 'reflocation'},
        {name: 'refdefaultreceiveaisle', referencedColumnName: 'refaisle'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    defaultreceivelocation: LocationEntity;

    @ManyToOne(() => LocationEntity, (locationrentity) => locationrentity.reflocation, {nullable: true})
    @JoinColumn([
        {name: 'refdefaultexpeditionlocation', referencedColumnName: 'reflocation'},
        {name: 'refdefaultexpeditionaisle', referencedColumnName: 'refaisle'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    defaultexpeditionlocation: LocationEntity;

    @ManyToOne(() => LocationEntity, (locationrentity) => locationrentity.reflocation, {nullable: true})
    @JoinColumn([
        {name: 'refdefaultgoodsfabricationlocation', referencedColumnName: 'reflocation'},
        {name: 'refdefaultgoodsfabricationaisle', referencedColumnName: 'refaisle'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    defaultgoodsfabricationlocation: LocationEntity;

    @ManyToOne(() => LocationEntity, (locationrentity) => locationrentity.reflocation, {nullable: true})
    @JoinColumn([
        {name: 'refdefaultrawmaterialconsumptionlocation', referencedColumnName: 'reflocation'},
        {name: 'refdefaultrawmaterialconsumptionaisle', referencedColumnName: 'refaisle'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    defaultrawmaterialconsumptionlocation: LocationEntity;

    @ManyToOne(() => LocationEntity, (locationrentity) => locationrentity.reflocation, {nullable: true})
    @JoinColumn([
        {name: 'refdefaultreturnlocation', referencedColumnName: 'reflocation'},
        {name: 'refdefaultreturnaisle', referencedColumnName: 'refaisle'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    defaultreturnlocation: LocationEntity;

    @ManyToOne(() => SitegeographyEntity, (sitegeographyentity) => sitegeographyentity.refsitegeographic, {nullable: false})
    @JoinColumn([
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
        {name: 'refsitegeographic', referencedColumnName: 'refsitegeographic'},
    ])
    sitegeographic: SitegeographyEntity;

    /**
    @OneToMany(() => UserCompaniesWarehousesEntity, (usercompanieswarehouseentity) => usercompanieswarehouseentity.refwarehouse)
    @JoinColumn([
        { name: 'refcompany', referencedColumnName: 'refcompany' },
        { name: 'reforganisation', referencedColumnName: 'reforganisation' },
        { name: 'refwarehouse', referencedColumnName: 'refwarehouse' },
    ])
    userscompanieswarehouse: UserCompaniesWarehousesEntity[];
    **/
}
