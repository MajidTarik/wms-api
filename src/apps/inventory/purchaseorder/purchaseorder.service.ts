import {BadRequestException, Injectable} from '@nestjs/common';
import {ParametresService} from "../../administration/parametres/parametres.service";
import {ItemsService} from "../../administration/items/items.service";
import {InjectRepository} from "@nestjs/typeorm";
import {PurchaserequisitionEntity} from "../../../entities/arazan-db/inventory/purchaserequisition.entity";
import {Repository} from "typeorm";
import {PurchaseorderEntity} from "../../../entities/arazan-db/inventory/purchaseorder.entity";
import {PurchaserequisitionService} from "../purchaserequisition/purchaserequisition.service";
import {IsNumber, IsOptional, IsString} from "class-validator";
import {PurchaseorderLinesEntity} from "../../../entities/arazan-db/inventory/purchaseorder-lines.entity";
import {PurchaseorderFindDto} from "./DTO/purchaseorder-find.dto";

@Injectable()
export class PurchaseorderService {
    constructor(
        @InjectRepository(PurchaseorderEntity)
        private readonly purchorderRepository: Repository<PurchaseorderEntity>,

        @InjectRepository(PurchaseorderLinesEntity)
        private readonly purchorderlinesRepository: Repository<PurchaseorderLinesEntity>,

        private parametreService: ParametresService,

        private itemService: ItemsService,
    ){}

    async bulkPurchOrder(pos){
        return await this.purchorderRepository
            .save(pos)
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async bulkPurchOrderLines(pos){
        return await this.purchorderlinesRepository
            .save(pos)
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async getPurchOrder(purchaseorderfindDto: PurchaseorderFindDto){
        return await this.purchorderRepository
            .find({
                where: [{
                    refcompany: purchaseorderfindDto.refcompany,
                    refpurchaserequisition: purchaseorderfindDto?.refpurchaserequisition,
                    refpurchaseorder: purchaseorderfindDto?.refpurchaseorder,
                }],
                relations: ['purchaserequisition', 'vendor', 'purchaseorderstatuts']
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

}
