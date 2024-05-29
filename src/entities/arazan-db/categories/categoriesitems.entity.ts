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
import {OrganisationEntity} from "../cartography/organisation.entity";
import {ItemsreleasedEntity} from "../items/itemsreleased.entity";

@Entity('categoriesitems')
export class CategoriesitemsEntity {
    @PrimaryColumn()
    refcategoriesgroup: string;

    @Column()
    refcategories: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @PrimaryColumn()
    refitem: string;

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

    @ManyToOne(() => CategoriesEntity, (categoriesentity) => categoriesentity.categoriesitems, {nullable: true})
    @JoinColumn([
        {name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup'},
        {name: 'refcategories', referencedColumnName: 'refcategories'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    category: CategoriesEntity;

    @ManyToOne(() => CategoriesgroupEntity, (categoriesgroupentity) => categoriesgroupentity.categoriesgroupitem, {nullable: false})
    @JoinColumn([
        {name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    categorygroup: CategoriesgroupEntity;

    @ManyToOne(() => ItemsreleasedEntity, (itemsreleasedentity) => itemsreleasedentity.categoriesaffectation, {nullable: false})
    @JoinColumn([
        {name: 'refitem', referencedColumnName: 'refitem'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    itemrealesed: ItemsreleasedEntity;
}
