import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import {CompanyEntity} from '../cartography/company.entity';
import {CategoriesgroupEntity} from './categoriesgroup.entity';
import {CategoriesEntity} from './categories.entity';
import {VendorEntity} from '../masterdata/vendor.entity';
import {OrganisationEntity} from "../cartography/organisation.entity";
import {VendorreleasedEntity} from "../masterdata/vendorreleased.entity";

@Entity('categoriesvendors')
export class CategoriesvendorsEntity {
    @PrimaryColumn()
    refcategoriesgroup: string;

    @Column()
    refcategories: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @PrimaryColumn()
    refvendor: string;

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

    @ManyToOne(() => CategoriesEntity, (categoriesentity) => categoriesentity.categoriesvendors, {nullable: true})
    @JoinColumn([
        {name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup'},
        {name: 'refcategories', referencedColumnName: 'refcategories'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    categories: CategoriesEntity;

    @ManyToOne(() => CategoriesgroupEntity, (categoriesgroupentity) => categoriesgroupentity.categoriesgroupvendor, {nullable: false})
    @JoinColumn([
        {name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    categorygroup: CategoriesgroupEntity;

    @ManyToOne(() => VendorreleasedEntity, (vendorreleased) => vendorreleased.categoriesaffectation, {nullable: false})
    @JoinColumn([
        {name: 'refvendor', referencedColumnName: 'refvendor'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    vendorrealsed: VendorreleasedEntity;
}
