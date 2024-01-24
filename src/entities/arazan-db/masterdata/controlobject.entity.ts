import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import {CategoriesgroupEntity} from "../categories/categoriesgroup.entity";
import {CategoriesEntity} from "../categories/categories.entity";

@Entity('controlobject')
export class ControlobjectEntity {
  @PrimaryColumn()
  refcontrolobject: string;

  @Column()
  controlobject: string;

  @Column({default: false})
  okforgroupcategories: boolean;

  @Column({default: false})
  okforworkflows: boolean;

  @Column({default: false})
  generatedpk: boolean;

  @Column({default: 1000})
  currentindex: number;

  @Column({default: '', unique: true})
  prefix: string;

  @Column({default: 1000})
  startwith: number;

  @OneToMany(() => CategoriesgroupEntity, (categoriesgroupentity) => categoriesgroupentity.controlobject, { nullable: true })
  @JoinColumn([
    { name: 'refcontrolobject', referencedColumnName: 'refcontrolobject' },
  ])
  categoriesgroups: CategoriesgroupEntity[];
}
