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
import { CategoriesgroupEntity } from "./categoriesgroup.entity";
import { CategoriesEntity } from "./categories.entity";
import {ItemsEntity} from "../items/items.entity";

@Entity('categoriesaffectations')
export class CategoriesaffectationsEntity {
  @PrimaryColumn()
  refcategoriesgroup: string;

  @Column()
  refcategories: string;

  @PrimaryColumn()
  refcompany: string;

  @PrimaryColumn()
  refentity: string;

  @PrimaryColumn()
  entity: string;

  @Column()
  actif: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  datetimecreation: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  datetimelastupdate: Date;

  @ManyToOne(() => CompanyEntity, (companyentity) => companyentity.refcompany, { nullable: false })
  @JoinColumn([{ name: 'refcompany', referencedColumnName: 'refcompany' }])
  company: CompanyEntity;

  @ManyToOne(() => CategoriesEntity, (categoriesentity) => categoriesentity.categoryAffectations, { nullable: true })
  @JoinColumn([
    { name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup' },
    { name: 'refcategories', referencedColumnName: 'refcategories' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  category: CategoriesEntity;

  @ManyToOne(() => CategoriesgroupEntity, (categoriesgroupentity) => categoriesgroupentity.categoriesgroupaffectation, { nullable: false })
  @JoinColumn([
    { name: 'refcategoriesgroup', referencedColumnName: 'refcategoriesgroup' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  categorygroup: CategoriesgroupEntity;

  @ManyToOne(() => ItemsEntity, (itemsentity) => itemsentity.categoriesaffectation, { nullable: false })
  @JoinColumn([
    { name: 'refentity', referencedColumnName: 'refitem' },
    { name: 'refcompany', referencedColumnName: 'refcompany' },
  ])
  item: ItemsEntity;
}
