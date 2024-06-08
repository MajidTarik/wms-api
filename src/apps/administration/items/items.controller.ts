import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { UnitCreateDto } from './DTO/unit-create.dto';
import { UnitFindDto } from './DTO/unit-find.dto';
import { UnitShowDto } from './DTO/unit-show.dto';
import { ItemsService } from './items.service';
import { PriceModelCreateDto } from "./DTO/price-model-create.dto";
import { PriceModelFindDto } from "./DTO/price-model-find.dto";
import { PriceModelShowDto } from "./DTO/price-model-show.dto";
import { ItemsFindDto } from "./DTO/Items-find.dto";
import { UomConversionCreateDto } from "./DTO/uom-conversion-create.dto";
import { UomConversionFindDto } from "./DTO/uom-conversion-find.dto";
import { UomInterneConversionCreateDto } from "./DTO/uom-interne-conversion-create.dto";
import { UomInterneConversionFindDto } from "./DTO/uom-interne-conversion-find.dto";
import { ItemsSaveDto } from "./DTO/Items-save.dto";
import {ItemsclassSaveDto} from "./DTO/Itemsclass-save.dto";
import {ItemsclassFindDto} from "./DTO/Itemsclass-find.dto";
import {VendorReleaseSaveDto} from "../masterdata/DTO/vendor-release-save.dto";
import {VendorReleaseFindDto} from "../masterdata/DTO/vendor-release-find.dto";
import {ItemReleaseSaveDto} from "./DTO/item-release-save.dto";
import {ItemReleaseFindDto} from "./DTO/item-release-find.dto";
import {ItemsGroupFindDto} from "./DTO/Items-group-find.dto";

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {
  }

  // ----------------------> Unite management
  @Post('createunit')
  async createUnit(@Body() unitDto: UnitCreateDto) {
    try {
      return await this.itemService.createUnit(unitDto);
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

  @Post('lookforunit')
  async lookForUnit(@Body() unitDto: UnitFindDto) {
    try {
      return await this.itemService.lookForUnit(unitDto);
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

  @Get('showunit/:refcompany/:refunit/:reforganisation')
  async showUnit(@Param() unitDto: UnitShowDto) {
    try {
      return await this.itemService.showUnit(unitDto);
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

  // ----------------------> Model de prix
  @Post('createpricemodel')
  async createPriceModel(@Body() pricemodelDto: PriceModelCreateDto) {
    try {
      return await this.itemService.createPriceModel(pricemodelDto);
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

  @Post('lookforpricemodel')
  async lookForPriceModel(@Body() pricemodelDto: PriceModelFindDto) {
    try {
      return await this.itemService.lookForPriceModel(pricemodelDto);
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

  @Post('findpricemodelbycriteria')
  async findPriceModelByCriteria(@Body() pricemodelDto: PriceModelFindDto) {
    try {
      return await this.itemService.findPriceModelByCriteria(pricemodelDto);
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

  @Get('showpricemodel/:refcompany/:refpricemodel/:reforganisation')
  async showPriceModel(@Param() pricemodelDto: PriceModelShowDto) {
    try {
      return await this.itemService.showPriceModel(pricemodelDto);
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

  // ----------------------> Items management
  @Post('lookforitem')
  async lookForItem(@Body() itemsDto: ItemsFindDto) {
    try {
      return await this.itemService.lookForItem(itemsDto);
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

  @Post('saveitem')
  async saveItem(@Body() itemsDto: ItemsSaveDto) {
    try {
      return await this.itemService.saveItem(itemsDto);
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

  // --------------------------------- UOM Conversion Management
  @Post('createuominterneconversion')
  async createuominterneconversion(@Body() uomconversionDto: UomInterneConversionCreateDto) {
    try {
      return await this.itemService.createUomInterneConversion(uomconversionDto);
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

  @Post('getuomcibycritaria')
  async getUomciByCritaria(@Body() uomconversionDto: UomInterneConversionFindDto) {
    try {
      return await this.itemService.getuomcibycritaria(uomconversionDto);
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

  // --------------------------------------------------- UOM I Conversiuon MANAGEMENT
  @Post('lookforuomconversion')
  async lookForUomConversion(@Body() uomconversionDto: UomConversionFindDto) {
    try {
      return await this.itemService.lookForUomconversion(uomconversionDto);
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

  @Post('createuomconversion')
  async createUomConversion(@Body() uomconversionDto: UomConversionCreateDto) {
    try {
      return await this.itemService.createUomConversion(uomconversionDto);
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

  //------------------------------- Item Class
  @Post('saveitemclass')
  async saveItemClass(@Body() itemclassDto: ItemsclassSaveDto) {
    try {
      return await this.itemService.saveItemClass(itemclassDto);
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

  @Post('getitemclass')
  async getItemClass(@Body() itemclassDto: ItemsclassFindDto) {
    try {
      return await this.itemService.getItemClass(itemclassDto);
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

  @Get('getitemtracking')
  async getItemTracking() {
    try {
      return await this.itemService.getItemTracking();
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

  @Post('getitemgroup')
  async getItemGroup(@Body() itemgroup: ItemsGroupFindDto) {
    try {
      return await this.itemService.getItemGroup(itemgroup);
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

  @Post('lanceritem')
  async lancerItem(@Body() itemDto: ItemReleaseSaveDto) {
    try {
      return await this.itemService.lancerItem(itemDto);
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

  @Post('getreleaseditembycompany')
  async getReleasedItemByCompany(@Body() itemReleaseFindDto: ItemReleaseFindDto) {
    try {
      return await this.itemService.getReleasedItemByCompany(itemReleaseFindDto);
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
