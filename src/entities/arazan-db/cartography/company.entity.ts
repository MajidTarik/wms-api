import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, ManyToOne, OneToMany,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import {UserEntity} from '../users/user.entity';
import {ParametresEntity} from '../parametres/parametres.entity';
import {WarehouseEntity} from "./warehouse.entity";
import {SitegeographyEntity} from "./sitegeography.entity";
import {AreaEntity} from "./area.entity";
import {UnitsEntity} from "../items/units.entity";
import {UomconversionEntity} from "../items/uomconversion.entity";
import {UserCompaniesEntity} from "../users/user-companies.entity";
import {CategoriesgroupEntity} from "../categories/categoriesgroup.entity";
import {AisleEntity} from "./aisle.entity";
import {CurrencyEntity} from "../masterdata/currency.entity";
import {OrganisationEntity} from "./organisation.entity";
import {ItemsreleasedEntity} from "../items/itemsreleased.entity";

@Entity('company')
export class CompanyEntity {
    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @Column({nullable: false})
    refcurrency: string;

    @Column({nullable: false})
    company: string;

    @Column({nullable: true})
    tel1: string;

    @Column({nullable: true})
    email1: string;

    @Column({nullable: true})
    responsable1: string;

    @Column({nullable: true})
    responsable2: string;

    @Column({nullable: true})
    tel2: string;

    @Column({nullable: true})
    email2: string;

    @Column({default: true, nullable: false})
    actif: boolean;

    @CreateDateColumn({type: 'timestamptz'})
    datetimecreation: Date;

    @UpdateDateColumn({type: 'timestamptz'})
    datetimelastupdate: Date;

    @OneToMany(() => ParametresEntity, (parametresentity) => parametresentity.company)
    @JoinColumn({name: 'refcompany'})
    parametres: ParametresEntity[];

    @OneToMany(() => WarehouseEntity, (warehouseEntity) => warehouseEntity.company)
    @JoinColumn({name: 'refcompany'})
    warehouses: WarehouseEntity[];

    @OneToMany(() => SitegeographyEntity, (sitegeographyentity) => sitegeographyentity.company)
    @JoinColumn({name: 'refcompany'})
    sitesgeographics: SitegeographyEntity[];

    @OneToMany(() => AreaEntity, (areaentity) => areaentity.company)
    @JoinColumn({name: 'refcompany'})
    areas: AreaEntity[];

    @OneToMany(() => UnitsEntity, (unitsentity) => unitsentity.company)
    @JoinColumn({name: 'refcompany'})
    units: UnitsEntity[];

    @OneToMany(() => ItemsreleasedEntity, (itemsentity) => itemsentity.company)
    @JoinColumn({name: 'refcompany'})
    itemsreleased: ItemsreleasedEntity[];

    @OneToMany(() => UomconversionEntity, (uomconversionentity) => uomconversionentity.company)
    @JoinColumn({name: 'refcompany'})
    uomconversions: UomconversionEntity[];

    @OneToMany(() => UserCompaniesEntity, (usercompaniesentity) => usercompaniesentity.company)
    @JoinColumn({name: 'refcompany'})
    userscompanies: UserCompaniesEntity[];

    @OneToMany(() => CategoriesgroupEntity, (categoriesgroupentity) => categoriesgroupentity.company)
    @JoinColumn({name: 'refcompany'})
    categoriesgroups: CategoriesgroupEntity[];

    @OneToMany(() => AisleEntity, (aisleentity) => aisleentity.company)
    @JoinColumn({name: 'refcompany'})
    aisles: AisleEntity[];

    @ManyToOne(() => CurrencyEntity, (currencyentity) => currencyentity.refcurrency, {nullable: true})
    @JoinColumn([
        {name: 'refcurrency', referencedColumnName: 'refcurrency'},
    ])
    currency: CurrencyEntity;

    @ManyToOne(() => OrganisationEntity, (organisationentity) => organisationentity.companies, {nullable: true})
    @JoinColumn([
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    organisation: OrganisationEntity;
}
