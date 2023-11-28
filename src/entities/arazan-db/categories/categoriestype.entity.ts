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
import { ParametresEntity } from "../parametres/parametres.entity";

@Entity('categoriestype')
export class CategoriestypeEntity {
  @PrimaryColumn()
  refcategoriestype: string;

  @Column()
  categoriestype: string;

  @OneToMany(() => CategoriesgroupEntity, (categoriesgroupentity) => categoriesgroupentity.categoriestype, { nullable: true })
  @JoinColumn([
    { name: 'refcategoriestype', referencedColumnName: 'refcategoriestype' },
  ])
  categoriesgroups: CategoriesgroupEntity[];
}
