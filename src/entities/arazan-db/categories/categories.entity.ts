import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, ManyToMany,
    ManyToOne, OneToMany,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import {CompanyEntity} from '../cartography/company.entity';
import {CategoriesgroupEntity} from "./categoriesgroup.entity";
import {CategoriesitemsEntity} from "./categoriesitems.entity";
import {CategoriesvendorsEntity} from "./categoriesvendors.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('categories')
export class CategoriesEntity {
    @PrimaryColumn()
    refcategoriesgroup: string;

    @PrimaryColumn()
    refcategories: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @Column({nullable: true})
    refparentcategoriesgroup: string;

    @Column({nullable: true})
    refparentcategories: string;

    @Column({nullable: true})
    refparentcompany: string;

    @Column({nullable: true})
    refparentorganisation: string;

    @Column()
    category: string;

    @Column()
    level: string;

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

    @ManyToOne(() => CategoriesEntity, (categoriesentity) => categoriesentity.parentcategory, {nullable: true})
    @JoinColumn([
        {name: 'refparentcategoriesgroup', referencedColumnName: 'refcategoriesgroup'},
        {name: 'refparentcategories', referencedColumnName: 'refcategories'},
        {name: 'refparentcompany', referencedColumnName: 'refcompany'},
        {name: 'refparentorganisation', referencedColumnName: 'reforganisation'},
    ])
    parentcategory: CategoriesEntity;

    @OneToMany(() => CategoriesitemsEntity, (categoriesitemsentity) => categoriesitemsentity.category)
    @JoinColumn([
        {name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup'},
        {name: 'refcategories', referencedColumnName: 'refcategories'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    categoriesitems: CategoriesitemsEntity[];

    @OneToMany(() => CategoriesvendorsEntity, (categoriesvendorsentity) => categoriesvendorsentity.categories)
    @JoinColumn([
        {name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup'},
        {name: 'refcategories', referencedColumnName: 'refcategories'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    categoriesvendors: CategoriesvendorsEntity[];

    @ManyToOne(() => CategoriesgroupEntity, (categoriesgroupentity) => categoriesgroupentity.categories, {nullable: false})
    @JoinColumn([
        {name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    categorygroup: CategoriesgroupEntity;
}
