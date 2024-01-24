import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Repository } from "typeorm";
import { CategoriesGroupSaveDto } from './DTO/categories-group-save.dto';
import { CategoriesGroupFindDto } from './DTO/categories-group-find.dto';
import { ParametresService } from "../parametres/parametres.service";
import { CategoriesgroupEntity } from "../../../entities/arazan-db/categories/categoriesgroup.entity";
import { CategoriesFindDto } from "./DTO/categories-find.dto";
import { CategoriesEntity } from "../../../entities/arazan-db/categories/categories.entity";
import { lastValueFrom, from } from "rxjs";
import { CategoriesSaveDto } from "./DTO/categories-save.dto";
import { CategoriesAffectationDto } from "./DTO/categories-Affectation.dto";
import {ItemsSaveDto} from "../items/DTO/Items-save.dto";
import {CategoriesaffectationsEntity} from "../../../entities/arazan-db/categories/categoriesaffectations.entity";

@Injectable({})
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesgroupEntity)
    private readonly categoriesGroupRepository: Repository<CategoriesgroupEntity>,

    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,

    @InjectRepository(CategoriesaffectationsEntity)
    private readonly categoriesaffectationsRepository: Repository<CategoriesaffectationsEntity>,

    private parametreService: ParametresService,
  ) {}

  // --------------------------------- Group Categoris
  async createCategoriesGroup(categoryGroupDto: CategoriesGroupSaveDto) {
    const categoryGroup = await this.categoriesGroupRepository.create(categoryGroupDto); // transform the DTO to the entity user
    return await this.categoriesGroupRepository
      .save(categoryGroup)
      .then(async (res) => {
        return await this.categoriesGroupRepository.findOneBy(categoryGroupDto);
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async findCategoriesGroup(categoryGroupDto: CategoriesGroupFindDto) {
    return await this.categoriesGroupRepository
      .find({
        where: [
          {
            refcompany: categoryGroupDto.refcompany,
            refcategoriesgroup: categoryGroupDto?.refcategoriesgroup || undefined,
            categoriesgroup: categoryGroupDto?.categoriesgroup || undefined,
          },
        ],
        relations: {
          controlobject: true,
        },
        order: { refcategoriesgroup: 'ASC' },
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  // --------------------------------- Categories Hierarchy
  async findHierarchyByGroupCategories(categoriesFindDto: CategoriesFindDto) {
    const categories = await this.categoriesRepository.find({
      where: {
        refparentcategories: IsNull(),
        refcompany: categoriesFindDto.refcompany,
        refcategoriesgroup: categoriesFindDto.refcategoriesgroup
      }, // Fetch only the top-level categories
    });
    await this.buildCategoryTree(categories);
    return categories;
  }

  private async buildCategoryTree(categories) {
    let i = 0;
    for await (const category of categories) {
      const cat = await this.categoriesRepository.find({
        where: {
          refparentcategories: category.refcategories,
          refparentcompany: category.refcompany,
          refparentcategoriesgroup: category.refcategoriesgroup,
        },
      });
      categories[i]['key'] = category.refcategories;
      categories[i]['label'] = category.refcategories;
      categories[i]['data'] = category.refcategories + ' | ' + category.category;
      categories[i]['icon'] = category.level === '1' ? 'pi pi-fw pi-folder-open': (cat.length > 0 ? 'pi pi-fw pi-tags' : 'pi pi-fw pi-tag');
      categories[i]['children'] = cat;
      await this.buildCategoryTree(cat);
      i++;
    }
  }

  async createCategory(categoryDto: CategoriesSaveDto) {
    let category = await this.categoriesRepository.findOneBy({
      refcompany : categoryDto.refcompany,
      refcategoriesgroup: categoryDto.refcategoriesgroup,
      refcategories: categoryDto.refcategories,
    });

    if (category) {
      category.actif = categoryDto.actif;
    } else {
      category = await this.categoriesRepository.create(categoryDto); // transform the DTO to the entity user
    }
    if (Number(category.level) === 1) {
      category.refparentcategories = null;
      category.refparentcompany = null;
      category.refparentcategoriesgroup = null;
    }

    return await this.categoriesRepository
      .save(category)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async findCategories(categoryDto: CategoriesFindDto) {
    return await this.categoriesRepository
      .find({
        where : [{
          refcompany: categoryDto.refcompany,
          refcategoriesgroup: categoryDto.refcategoriesgroup,
          refcategories: categoryDto?.refcategories || undefined,
        }]
      })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async findCategoriesByEntity(categoriesAffectation: CategoriesAffectationDto) {
    return await this.categoriesGroupRepository
      .createQueryBuilder('categoriesgroup')
      .innerJoinAndSelect('categoriesgroup.controlobject', 'controlobject', 'controlobject.refcontrolobject = :refcontrolobject', {refcontrolobject: categoriesAffectation.refcontrolobject})
      .leftJoinAndSelect('categoriesgroup.categoriesgroupaffectation', 'categoriesaffectations', 'categoriesaffectations.refentity = :refentity and categoriesaffectations.entity = :entity', {refentity: categoriesAffectation.refentity, entity: categoriesAffectation.entity})
      .getMany()
      .then(async (res) => {
        console.log('==================>',res);
        let i = 0;
        for await (const grcategories of res) {
          const hierarchyCategories = await this.findHierarchyByGroupCategories({refcategoriesgroup: grcategories['refcategoriesgroup'], refcompany: categoriesAffectation.refcompany, refcategories: undefined})
          res[i]['categories'] = hierarchyCategories;
          i++;
        }

        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async affectationItemCategories(categories, refcompany, refitem) {
    let i = 0;
    for await (const catego of categories) {
      categories[i]['refcompany'] = refcompany;
      categories[i]['refentity'] = refitem;
      categories[i]['entity'] = 'ITEM';
      categories[i]['actif'] = true;
      i++;
    }

    return await this.categoriesaffectationsRepository
        .save(categories)
        .then(async (res) => {
          return res;
        })
        .catch((err) => {
          throw new BadRequestException(err.message, { cause: err, description: err.query,});
        });
  }
}
