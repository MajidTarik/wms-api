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
import { VariantSaveDto } from "./DTO/Variant-save.dto";
import { VariantsFindDto } from "./DTO/variants-find.dto";
import { UomConversionVariantCreateDto } from "./DTO/uom-conversion-variant-create.dto";
import { UomConversionVariantFindDto } from "./DTO/uom-conversion-variant-find.dto";

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

  @Get('showunit/:refcompany/:refunit')
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

  @Get('showpricemodel/:refcompany/:refpricemodel')
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

  @Post('finditem')
  async findItem(@Body() itemsDto: ItemsFindDto) {
    try {
      return await this.itemService.findItem(itemsDto);
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
    console.log(itemsDto);
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

  // --------------------------------- UOM CONVERSION VARIANT
  @Post('createuomconversionvariant')
  async createUomConversionVariant(@Body() uomconversionDto: UomConversionVariantCreateDto) {
    try {
      return await this.itemService.createUomConversionVariant(uomconversionDto);
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

  @Post('lookforuomconversionvariant')
  async lookForUomConversionVariant(@Body() uomconversionvariantDto: UomConversionVariantFindDto) {
    try {
      return await this.itemService.lookForUomconversionVariant(uomconversionvariantDto);
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

  // --------------------------------- Variant Logistique
  @Post('savevariant')
  async saveVariant(@Body() variantDto: VariantSaveDto) {
    try {
      return await this.itemService.saveVariant(variantDto);
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

  @Post('findvariant')
  async findVariant(@Body() variantDto: VariantsFindDto) {
    try {
      console.log(variantDto);
      return await this.itemService.findVariant(variantDto);
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
