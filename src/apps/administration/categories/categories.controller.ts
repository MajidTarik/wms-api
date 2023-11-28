import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { CategoriesGroupSaveDto } from './DTO/categories-group-save.dto';
import { CategoriesGroupFindDto } from './DTO/categories-group-find.dto';
import { CategoriesService } from './categories.service';
import { CategoriesFindDto } from "./DTO/categories-find.dto";
import { CategoriesSaveDto } from "./DTO/categories-save.dto";
import { CategoriesAffectationDto } from "./DTO/categories-Affectation.dto";

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {
  }

  // ----------------------> Catégories management
  @Post('savecategoriesgroup')
  async createCategoriesGroup(@Body() categoryGroupDto: CategoriesGroupSaveDto) {
    try {
      return await this.categoriesService.createCategoriesGroup(categoryGroupDto);
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.response.error,
        },
        e.status,
        {
          cause: e,
        },
      );
    }
  }

  @Post('findcategoriesgroup')
  async findCategoriesGroup(@Body() categoryGroupDto: CategoriesGroupFindDto) {
    try {
      return await this.categoriesService.findCategoriesGroup(categoryGroupDto);
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.response.error,
        },
        e.status,
        {
          cause: e,
        },
      );
    }
  }

  @Post('findhierarchybygroupcategories')
  async findHierarchyByGroupCategories(@Body() categoryDto: CategoriesFindDto) {
    try {
      return await this.categoriesService.findHierarchyByGroupCategories( categoryDto );
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.response.error,
        },
        e.status,
        {
          cause: e,
        },
      );
    }
  }

  @Post('savecategory')
  async createCategory(@Body() categoryDto: CategoriesSaveDto) {
    try {
      return await this.categoriesService.createCategory(categoryDto);
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.response.error,
        },
        e.status,
        {
          cause: e,
        },
      );
    }
  }

  @Post('findcategory')
  async findCategory(@Body() categoryDto: CategoriesFindDto) {
    try {
      return await this.categoriesService.findCategories(categoryDto);
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.response.error,
        },
        e.status,
        {
          cause: e,
        },
      );
    }
  }

  @Get('findcategoriestype')
  async findCategoriestype(@Param() param) {
    try {
      return await this.categoriesService.findCategoriestype();
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.response.error,
        },
        e.status,
        {
          cause: e,
        },
      );
    }
  }

  @Post('findcategoriesbyentity')
  async findCategoriesByEntity(@Body() categoriesAffectation: CategoriesAffectationDto) {
    try {
      console.log(categoriesAffectation)
      return await this.categoriesService.findCategoriesByEntity(categoriesAffectation);
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.response.error,
        },
        e.status,
        {
          cause: e,
        },
      );
    }
  }
}
