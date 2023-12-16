import { Body, Controller, Delete, Get, HttpException, Param, Post } from "@nestjs/common";
import { CompanyCreateDto } from './DTO/company-create.dto';
import { WhCartographyService } from './wh-cartography.service';
import { CompanyFindDto } from "./DTO/company-find.dto";
import { CompanyShowDto } from "./DTO/company-show.dto";
import { CompanyDeleteDto } from "./DTO/company-delete.dto";
import { SitegeographicCreateDto } from "./DTO/sitegeographic-create.dto";
import { SitegeographicFindDto } from "./DTO/sitegeographic-find.dto";
import { SitegeographicShowDto } from "./DTO/sitegeographic-show.dto";
import { WarehouseCreateDto } from "./DTO/warehouse-create.dto";
import { WarehouseFindDto } from "./DTO/warehouse-find.dto";
import { WarehouseShowDto } from "./DTO/warehouse-show.dto";
import { AreaCreateDto } from "./DTO/area-create.dto";
import { AreaFindDto } from "./DTO/area-find.dto";
import { AreaShowDto } from "./DTO/area-show.dto";
import {AisleSaveDto} from "./DTO/aisle-save.dto";
import {AisleFindDto} from "./DTO/aisle-find.dto";
import {LocationFindDto} from "./DTO/location-find.dto";
import {LocationSaveDto} from "./DTO/location-save.dto";

@Controller('wh-cartography')
export class WhCartographyController {
  constructor(private whcartographyService: WhCartographyService) {}

  // -------------------------------------------> Company
  @Post('createcompany')
  async createCompany(@Body() companyDto: CompanyCreateDto) {
    try {
      return await this.whcartographyService.createCompany(companyDto);
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

  @Post('lookforcompany')
  async lookForCompany(@Body() companyDto: CompanyFindDto) {
    try {
      return await this.whcartographyService.lookForCompany(companyDto);
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

  @Post('findcompanybycriteria')
  async findCompanyByCriteria(@Body() companyDto: CompanyFindDto) {
    try {
      return await this.whcartographyService.findCompanyByCriteria(companyDto);
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

  @Get('showcompany/:refcompany')
  async showCompany(@Param() companydto: CompanyShowDto) {
    try {
      return await this.whcartographyService.showCompany(companydto);
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

  @Delete('deletecompany/:refcompany')
  async deleteCompany(@Param() companydto: CompanyDeleteDto) {
    try {
      return await this.whcartographyService.deleteCompany(companydto);
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

  // -------------------------------------------> Site geographic
  @Post('createsitegeographic')
  async createSitegeographic(@Body() sitegeographicDto: SitegeographicCreateDto) {
    try {
      return await this.whcartographyService.createSitegeographic(sitegeographicDto);
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

  @Post('findsitebycriteria')
  async findSiteByCriteria(@Body() sitegeographicDto: SitegeographicFindDto) {
    try {
      return await this.whcartographyService.findSiteByCriteria(sitegeographicDto);
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

  @Get('showsitegeographic/:refcompany/:refsitegeographic')
  async showSitegeographic(@Param() sitegeographicDto: SitegeographicShowDto) {
    try {
      return await this.whcartographyService.showSitegeographic(sitegeographicDto);
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

  // -------------------------------------------> Warehouse Management
  @Post('createwarehouse')
  async createWarehouse(@Body() warehouseDto: WarehouseCreateDto) {
    try {
      return await this.whcartographyService.createWarehouse(warehouseDto);
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

  @Post('lookforwarehouse')
  async lookForWarehouse(@Body() warehouseDto: WarehouseFindDto) {
    try {
      return await this.whcartographyService.lookForWarehouse(warehouseDto);
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

  @Post('findwarehousebycriteria')
  async findWarehouseByCriteria(@Body() warehouseDto: WarehouseFindDto) {
    try {
      return await this.whcartographyService.findWarehouseByCriteria(warehouseDto);
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

  @Get('showwarehouse/:refcompany/:refwarehouse')
  async showWarehouse(@Param() warehouseDto: WarehouseShowDto) {
    try {
      return await this.whcartographyService.showWarehouse(warehouseDto);
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

  // -------------------------------------------> Area Management
  @Post('createarea')
  async createArea(@Body() areaDto: AreaCreateDto) {
    try {
      return await this.whcartographyService.createArea(areaDto);
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

  @Post('lookforarea')
  async lookForArea(@Body() areaDto: AreaFindDto) {
    try {
      return await this.whcartographyService.lookForArea(areaDto);
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

  @Post('findareabycriteria')
  async findAreaByCriteria(@Body() areaDto: AreaFindDto) {
    try {
      return await this.whcartographyService.findAreaByCriteria(areaDto);
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

  @Get('showarea/:refcompany/:refarea')
  async showArea(@Param() areaDto: AreaShowDto) {
    try {
      return await this.whcartographyService.showArea(areaDto);
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

  //-----------------------------------------------AISLE MANAGEMENT ------------------------------------------//
  @Post('findaisle')
  async findAisle(@Body() aisleDto: AisleFindDto) {
    try {
      return await this.whcartographyService.findAisle(aisleDto);
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

  @Post('saveaisle')
  async saveAisle(@Body() aisleDto: AisleSaveDto) {
    try {
      return await this.whcartographyService.saveAisle(aisleDto);
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

  @Get('findfournituretype')
  async findFournitureType() {
    try {
      return await this.whcartographyService.findFournitureType();
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

  @Post('getlocationsbyaisle')
  async getLocationsByAisle(@Body() location: LocationFindDto) {
    try {
      return await this.whcartographyService.getLocationsByAisle(location);
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

  @Post('savelocation')
  async saveLocation(@Body() location: LocationSaveDto) {
    try {
      return await this.whcartographyService.saveLocation(location);
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
