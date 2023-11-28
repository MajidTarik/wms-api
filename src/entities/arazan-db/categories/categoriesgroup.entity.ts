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
import { UserEntity } from '../users/user.entity';
import { CompanyEntity } from '../cartography/company.entity';
import { ItemsEntity } from "../items/items.entity";
import { UomconversionEntity } from "../items/uomconversion.entity";
import { CategoriesEntity } from "./categories.entity";
import { CategoriestypeEntity } from "./categoriestype.entity";
import { CategoriesaffectationsEntity } from "./categoriesaffectations.entity";

@Entity('categoriesgroup')
export class CategoriesgroupEntity {
  @PrimaryColumn()
  refcategoriesgroup: string;

  @PrimaryColumn()
  refcompany: string;

  @Column()
  categoriesgroup: string;

  @Column()
  refcategoriestype: string;

  @Column()
  actif: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  idoperateurcreation: UserEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  idoperateurlastupdate: UserEntity;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @ManyToOne(() => CategoriestypeEntity, (categoriestypeEntity) => categoriestypeEntity.categoriesgroups, { nullable: false })
  @JoinColumn([{ name: 'refcategoriestype', referencedColumnName: 'refcategoriestype' }])
  categoriestype: CategoriestypeEntity;

  @OneToMany(() => CategoriesEntity, (categoriesentity) => categoriesentity.categorygroup, { nullable: false })
  @JoinColumn([
    { name: 'refcompany', referencedColumnName: 'refcompany' },
    { name: 'refcategories', referencedColumnName: 'refcategories' },
  ])
  categories: CategoriesEntity[];

  @OneToMany(() => CategoriesaffectationsEntity, (categoriesaffectationsentity) => categoriesaffectationsentity.categorygroup)
  @JoinColumn([
    { name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  categoriesgroupaffectation: CategoriesaffectationsEntity[];
}
