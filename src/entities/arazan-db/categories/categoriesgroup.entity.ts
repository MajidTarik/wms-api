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
import { CompanyEntity } from '../cartography/company.entity';
import { CategoriesEntity } from "./categories.entity";
import { CategoriesaffectationsEntity } from "./categoriesaffectations.entity";
import { ControlobjectEntity } from "../masterdata/controlobject.entity";

@Entity('categoriesgroup')
export class CategoriesgroupEntity {
  @PrimaryColumn()
  refcategoriesgroup: string;

  @PrimaryColumn()
  refcompany: string;

  @Column()
  categoriesgroup: string;

  @Column()
  refcontrolobject: string;

  @Column()
  actif: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @ManyToOne(() => ControlobjectEntity, (controlobjectentity) => controlobjectentity.categoriesgroups, { nullable: false })
  @JoinColumn([{ name: 'refcontrolobject', referencedColumnName: 'refcontrolobject' }])
  controlobject: ControlobjectEntity;

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
