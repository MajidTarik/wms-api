import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, ManyToMany,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { UserEntity } from '../users/user.entity';
import { CompanyEntity } from '../cartography/company.entity';
import { CategoriesgroupEntity } from "./categoriesgroup.entity";
import { CategoriesAffectationDto } from "../../../apps/administration/categories/DTO/categories-Affectation.dto";
import { CategoriesaffectationsEntity } from "./categoriesaffectations.entity";
import { JoinTable } from "typeorm/browser";

@Entity('categories')
export class CategoriesEntity {
  @PrimaryColumn()
  refcategoriesgroup: string;

  @PrimaryColumn()
  refcategories: string;

  @PrimaryColumn()
  refcompany: string;

  @Column({ nullable: true })
  refparentcategoriesgroup: string;

  @Column({ nullable: true })
  refparentcategories: string;

  @Column({ nullable: true })
  refparentcompany: string;

  @Column()
  category: string;

  @Column()
  level: string;

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

  @ManyToOne(() => CategoriesEntity, (categoriesentity) => categoriesentity.parentcategory, { nullable: true })
  @JoinColumn([
    { name: 'refparentcategoriesgroup', referencedColumnName: 'refcategoriesgroup' },
    { name: 'refparentcategories', referencedColumnName: 'refcategories' },
    { name: 'refparentcompany', referencedColumnName: 'refcompany' },
  ])
  parentcategory: CategoriesEntity;

  @OneToMany(() => CategoriesaffectationsEntity, (categoriesaffectationsentity) => categoriesaffectationsentity.category)
  @JoinColumn([
    { name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup' },
    { name: 'refcategories', referencedColumnName: 'refcategories' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  categoryAffectations: CategoriesaffectationsEntity[];

  @ManyToOne(() => CategoriesgroupEntity, (categoriesgroupentity) => categoriesgroupentity.categories, { nullable: false })
  @JoinColumn([
    { name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  categorygroup: CategoriesgroupEntity;
}
