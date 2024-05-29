import {BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
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
import {MasterdataService} from "../masterdata/masterdata.service";
import {CategoriesitemsEntity} from "../../../entities/arazan-db/categories/categoriesitems.entity";
import {CategoriesvendorsEntity} from "../../../entities/arazan-db/categories/categoriesvendors.entity";

@Injectable({})
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesgroupEntity)
    private readonly categoriesGroupRepository: Repository<CategoriesgroupEntity>,

    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,

    @InjectRepository(CategoriesitemsEntity)
    private readonly categoriesitemsRepository: Repository<CategoriesitemsEntity>,

    @InjectRepository(CategoriesvendorsEntity)
    private readonly categoriesvendorRepository: Repository<CategoriesvendorsEntity>,

    private parametreService: ParametresService,

    //@Inject(forwardRef(() => MasterdataService))
    private masterdataService: MasterdataService,
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
    const controlobject = await this.masterdataService.findControlobject({
      refcontrolobject : undefined,
      okforaddress: undefined,
      okforgroupcategories: undefined,
      okforworkflows: undefined,
      prefix: categoriesAffectation.prefix,
    });

    let buildedQuery = await this.categoriesGroupRepository.createQueryBuilder('categoriesgroup');

    if (!controlobject || controlobject.length < 1) {
      throw new BadRequestException('Merci d envoyer au moins un critére valide l\'object contrôler est invalide', {});
    }

    if (!controlobject[0].okforgroupcategories) {
      console.log('object non autoriser pour le contrôle d\'address')
      throw new BadRequestException('object non autoriser pour le contrôle d\'address', {});
    } else {
      if (controlobject[0].prefix === 'VD') {
        await buildedQuery
            .innerJoinAndSelect('categoriesgroup.controlobject', 'controlobject', 'controlobject.prefix = :prefix', {prefix: categoriesAffectation.prefix})
            .leftJoinAndSelect('categoriesgroup.categoriesgroupvendor', 'categoriesgroupaffectation', 'categoriesgroupaffectation.refvendor = :refobject', {refobject: categoriesAffectation.refObject})
            .where('categoriesgroup.refcompany = :refcompany', {refcompany: categoriesAffectation.refcompany})
            .andWhere('categoriesgroup.refcompany = :refcompany', {refcompany: categoriesAffectation.refcompany})
      } else if (controlobject[0].prefix === 'ITM') {
        await buildedQuery
            .innerJoinAndSelect('categoriesgroup.controlobject', 'controlobject', 'controlobject.prefix = :prefix', {prefix: categoriesAffectation.prefix})
            .leftJoinAndSelect('categoriesgroup.categoriesgroupitem', 'categoriesgroupaffectation', 'categoriesgroupaffectation.refitem = :refobject', {refobject: categoriesAffectation.refObject})
            .where('categoriesgroup.refcompany = :refcompany', {refcompany: categoriesAffectation.refcompany})
      } else {
        throw new BadRequestException('l\'object contrôler est introuvable', {});
      }
      return await buildedQuery
          .getMany()
          .then(async (res) => {
            let i = 0;
            for await (const grcategories of res) {
              const hierarchyCategories = await this.findHierarchyByGroupCategories({refcategoriesgroup: grcategories['refcategoriesgroup'], refcompany: categoriesAffectation.refcompany, refcategories: undefined})
              res[i]['categories'] = hierarchyCategories;
              i++;
            }
            return res;
          })
          .catch((err) => {
            throw new BadRequestException(err.message, {cause: err, description: err.query,});
          });
    }
  }

  async affectationEntityCategories(categories, refcompany, refobject, prefix) {
    const controlobject = await this.masterdataService.findControlobject({
      refcontrolobject : undefined,
      okforaddress: undefined,
      okforgroupcategories: undefined,
      okforworkflows: undefined,
      prefix: prefix,
    });

    if (!controlobject || controlobject.length < 1) {
      throw new BadRequestException('Merci d envoyer au moins un critére valide l\'object contrôler est invalide', {});
    }

    if (!controlobject[0].okforgroupcategories) {
      console.log('object non autoriser pour le contrôle d\'address')
      throw new BadRequestException('object non autoriser pour le contrôle d\'address', {});
    } else {
      if (controlobject[0].prefix === 'VD') {
        return await this.categoriesvendorRepository.findBy({
          refcompany: refcompany,
          refvendor: refobject,
        })
            .then(async (res) => {
              return await this.categoriesvendorRepository.remove(res)
                  .then(async (res) => {
                    let i = 0;
                    for await (const catego of categories) {
                      categories[i]['refcompany'] = refcompany;
                      categories[i]['refvendor'] = refobject;
                      i++;
                    }
                    return await this.categoriesvendorRepository
                        .save(categories)
                        .then(async (res) => {
                          return res;
                        })
                        .catch((err) => {
                          throw new BadRequestException(err.message, { cause: err, description: err.query,});
                        });
                  })
                  .catch((err) => {
                    throw new BadRequestException(err.message, {cause: err, description: err.query,});
                  });
            })
            .catch((err) => {
              throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
      } else if (controlobject[0].prefix === 'ITM') {
        console.log('=====================================-=-=-=-=-=-=------------------->>>>>>!!!')
        return await this.categoriesitemsRepository.findBy({
          refcompany: refcompany,
          refitem: refobject,
        })
            .then(async (res) => {
              return await this.categoriesitemsRepository.remove(res)
                  .then(async (res) => {
                    let i = 0;
                    for await (const catego of categories) {
                      categories[i]['refcompany'] = refcompany;
                      categories[i]['refitem'] = refobject;
                      i++;
                    }
                    return await this.categoriesitemsRepository
                        .save(categories)
                        .then(async (res) => {
                          return res;
                        })
                        .catch((err) => {
                          throw new BadRequestException(err.message, { cause: err, description: err.query,});
                        });
                  })
                  .catch((err) => {
                    throw new BadRequestException(err.message, {cause: err, description: err.query,});
                  });
            })
            .catch((err) => {
              throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });

        console.log('<<<<<<<<<<<<<<<<=====================================-=-=-=-=-=-=------------------->>>>>>!!!')
      } else {
        throw new BadRequestException('l\'object contrôler est introuvable', {});
      }
    }
  }
}
