import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import {CompanyEntity} from '../cartography/company.entity';
import {CategoriesEntity} from "./categories.entity";
import {ControlobjectEntity} from "../masterdata/controlobject.entity";
import {CategoriesvendorsEntity} from "./categoriesvendors.entity";
import {CategoriesitemsEntity} from "./categoriesitems.entity";
import {OrganisationEntity} from "../cartography/organisation.entity";

@Entity('categoriesgroup')
export class CategoriesgroupEntity {
    @PrimaryColumn()
    refcategoriesgroup: string;

    @PrimaryColumn()
    refcompany: string;

    @PrimaryColumn()
    reforganisation: string;

    @Column()
    categoriesgroup: string;

    @Column()
    refcontrolobject: string;

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

    @ManyToOne(() => ControlobjectEntity, (controlobjectentity) => controlobjectentity.categoriesgroups, {nullable: false})
    @JoinColumn([{name: 'refcontrolobject', referencedColumnName: 'refcontrolobject'}])
    controlobject: ControlobjectEntity;

    @OneToMany(() => CategoriesEntity, (categoriesentity) => categoriesentity.categorygroup, {nullable: false})
    @JoinColumn([
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
        {name: 'refcategories', referencedColumnName: 'refcategories'},
    ])
    categories: CategoriesEntity[];

    @OneToMany(() => CategoriesvendorsEntity, (categoriesvendorsentity) => categoriesvendorsentity.categorygroup)
    @JoinColumn([
        {name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    categoriesgroupvendor: CategoriesvendorsEntity[];

    @OneToMany(() => CategoriesitemsEntity, (categoriesitemsentity) => categoriesitemsentity.categorygroup)
    @JoinColumn([
        {name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup'},
        {name: 'refcompany', referencedColumnName: 'refcompany'},
        {name: 'reforganisation', referencedColumnName: 'reforganisation'},
    ])
    categoriesgroupitem: CategoriesitemsEntity[];
}
