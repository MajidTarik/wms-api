import { Body, Controller, Get, HttpException, Param, Post, Query } from "@nestjs/common";
import { ParametresService } from './parametres.service';
import { ParametreCreateDto } from './DTO/parametre-create.dto';
import { ParametresFindDto } from './DTO/parametres-find.dto';
import { ParametresShowDto } from './DTO/./parametres-show.dto';
import { ParametresAttributeCreatDto } from './DTO/parametres-attribute-creat.dto';
import { ParametresAttributeFindDto } from './DTO/parametres-attribute-find.dto';
import { ParametresAttributeShowDto } from './DTO/parametres-attribute-show.dto';
import {ParametresHeaderFindDto} from "./DTO/parametres-header-find.dto";

@Controller('parametre')
export class ParametresController {
  constructor(private parametreService: ParametresService) {}
  // ----------------------> Type Parametre
  @Get('findtypeparametre')
  async findTypeParametre() {
    try {
      return await this.parametreService.findTypeParametre();
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

  // ----------------------> Parametre
  @Post('createparametre')
  async createParametre(@Body() parametreDto: ParametreCreateDto) {
    try {
      return await this.parametreService.createParametre( parametreDto );
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

  @Post('findparametre')
  async findParametre(@Body() parametreDto: ParametresFindDto) {
    try {
      return await this.parametreService.findParametre(parametreDto);
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
  /** OK **/
  @Get('showparametre/:refcompany/:refparametre')
  async showParametre(@Param() parametredto: ParametresShowDto) {
    try {
      return await this.parametreService.showParametre(parametredto);
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.response['error'],
        },
        e.status,
        {
          cause: e,
        },
      );
    }
  }

  // ----------------------> Attributs de parametre
  /** OK **/
  @Post('createattributparametre')
  async createattributparametre(@Body() attributparametreDto: ParametresAttributeCreatDto) {
    try {
      return await this.parametreService.createAttributparametre(attributparametreDto);
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
  /** OK **/
  @Post('findattributparametre')
  async findAttributparametre(@Body() attributparametreDto: ParametresAttributeFindDto) {
    try {
      return await this.parametreService.findAttributParametre(attributparametreDto);
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
  /** OK **/
  @Get('showattributparametre/:refcompany/:refparametre/:value')
  async showAttributParametre(@Param() attributparametredto: ParametresAttributeShowDto) {
    try {
      return await this.parametreService.showAttributparametre(attributparametredto);
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.response['error'],
        },
        e.status,
        {
          cause: e,
        },
      );
    }
  }

  @Post('getidheaderbyparametre')
  async getIdHeaderByParametre(@Body() attributeDto: ParametresHeaderFindDto) {
    try {
      return await this.parametreService.getIdHeaderByParametre(attributeDto);
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
