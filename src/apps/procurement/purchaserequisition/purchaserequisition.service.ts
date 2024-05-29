import {BadRequestException, Body, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PurchaserequisitionSaveDto} from "./DTO/purchaserequisition-save.dto";
import {PurchaserequisitionFindDto} from "./DTO/purchaserequisition-find.dto";
import {ParametresService} from "../../administration/parametres/parametres.service";
import {PurchaserequisitionEntity} from "../../../entities/arazan-db/procurement/purchaserequisition.entity";
import {PurchaserequisitionChangeStatutDto} from "./DTO/purchaserequisition-change-statut.dto";
import {Purchaserequisitionstatuts} from "../../../helpers/purchaserequisitionstatuts";
import {PurchaserequisitionLinesFindDto} from "./DTO/purchaserequisition-lines-find.dto";
import {PurchaserequisitionLinesEntity} from "../../../entities/arazan-db/procurement/purchaserequisition-lines.entity";
import {PurchaserequisitionLinesPriceUpsertDto} from "./DTO/purchaserequisition-lines-price-upsert.dto";
import {PurchaserequisitionLinesQtyUpsertDto} from "./DTO/purchaserequisition-lines-qty-upsert.dto";
import {PurchaserequisitionLinesNewDto} from "./DTO/purchaserequisition-lines-new.dto";
import {PurchaserequisitionLinesItemUpdateDto} from "./DTO/purchaserequisition-lines-item-update.dto";
import {ItemsService} from "../../administration/items/items.service";
import {PurchaserequisitionLinesAxeAnalyticsDto} from "./DTO/purchaserequisition-lines-axe-analytics.dto";
import {PurchaserequisitionLinesVendorUpdateDto} from "./DTO/PurchaserequisitionLinesVendorUpdateDto";
import {PurchaserequisitionLinesDeleteDto} from "./DTO/purchaserequisition-lines-delete.dto";
import {PurchaserequisitionLinesFindByIdDto} from "./DTO/purchaserequisition-lines-find-by-id.dto";
import {MasterdataService} from "../../administration/masterdata/masterdata.service";
import {Purchaseorderstatuts} from "../../../helpers/purchaseorderstatuts";
import {PurchaseorderService} from "../purchaseorder/purchaseorder.service";
import {IsNumber, IsOptional, IsString} from "class-validator";
import {
    PurchaserequisitionLinesDiscountValueUpsertDto
} from "./DTO/purchaserequisition-lines-discount-value-upsert.dto";
import {
    PurchaserequisitionLinesDiscountPercentageUpsertDto
} from "./DTO/purchaserequisition-lines-discount-percentage-upsert.dto";
import {PurchaserequisitionLinesTaxeUpdateDto} from "./DTO/purchaserequisition-lines-taxe-update.dto";
import {isUndefined} from "@nestjs/common/utils/shared.utils";

@Injectable()
export class PurchaserequisitionService {

    constructor(
        private parametreService: ParametresService,

        private itemService: ItemsService,

        private masterdataService: MasterdataService,

        private purchorderService: PurchaseorderService,

        @InjectRepository(PurchaserequisitionEntity)
        private readonly purchreqRepository: Repository<PurchaserequisitionEntity>,

        @InjectRepository(PurchaserequisitionLinesEntity)
        private readonly purchreqlinesRepository: Repository<PurchaserequisitionLinesEntity>,

    ){}

    // ____________________________________________________ RURCHASEREQUISITION MANAGEMENT --------------------------------

    async getPurchRequisitions (purchaserequisitionFindDto: PurchaserequisitionFindDto) {
        return await this.purchreqRepository
            .find({
                where: [
                    {
                        refcompany: purchaserequisitionFindDto.refcompany,
                        refpurchaserequisition: purchaserequisitionFindDto?.refpurchaserequisition,
                    },
                ],
                relations: ['submitterpurchreq', 'preparatorpurchreq', 'rejecterpurchreq', 'closedpurchreq', 'approvalpurchreq'],
                order: { refpurchaserequisition: 'ASC' },
            })
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async savePurchRequisitions(purchaserequisitionSaveDto: PurchaserequisitionSaveDto) {
        if ([undefined, null, ''].includes(purchaserequisitionSaveDto.refpurchaserequisition))
            purchaserequisitionSaveDto.refpurchaserequisition = await this.masterdataService.generatepk('PR');

        await this.isPurchReqStatut({refpurchaserequisition: purchaserequisitionSaveDto.refpurchaserequisition, refcompany: purchaserequisitionSaveDto.refcompany}, Purchaserequisitionstatuts.BRLN.toString())
        const purchreq = await this.purchreqRepository.create(purchaserequisitionSaveDto);
        // -------------------------------------------- Statut Berouillon
        purchreq.refpurchaserequisitionstatuts = Purchaserequisitionstatuts.BRLN.toString();
        return await this.purchreqRepository
            .save(purchreq)
            .then(async (res) => {
                return res
                //return await this.getPurchRequisitions({refcompany: res.refcompany, refpurchaserequisition: res.refpurchaserequisition})
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async purchReqStatutsManagement(purchaserequisitionChangeStatutDto: PurchaserequisitionChangeStatutDto) {
        const purchreq = await this.purchreqRepository.findOneBy({
            refpurchaserequisition: purchaserequisitionChangeStatutDto.refpurchaserequisition,
            refcompany: purchaserequisitionChangeStatutDto.refcompany,
        });

        let errormessage = '';
        if (purchaserequisitionChangeStatutDto.refpurchaserequisitionstatuts ===  Purchaserequisitionstatuts.BRLN.toString()) {
        // ----------------->>> Modifier la DA.
            if ([Purchaserequisitionstatuts.CLTR.toString(), Purchaserequisitionstatuts.BRLN.toString()].includes(purchreq.refpurchaserequisitionstatuts)) {
                errormessage = 'le statut '+purchreq.refpurchaserequisitionstatuts+'ne permet pas de revenir au statut Berouillon!';

            } else {
                purchreq.refpurchaserequisitionstatuts = purchaserequisitionChangeStatutDto.refpurchaserequisitionstatuts;
                purchreq.requisitiondate = new Date();

                purchreq.datesubmittion = null;
                purchreq.submittedby = null;

                purchreq.dateapprovement = null;
                purchreq.approvedby = null;

                purchreq.daterejection = null;
                purchreq.rejectedby = null;

                await this.initPurchReqLines(purchaserequisitionChangeStatutDto.refpurchaserequisition, purchaserequisitionChangeStatutDto.refcompany)

            }
        } else if (purchaserequisitionChangeStatutDto.refpurchaserequisitionstatuts ===  Purchaserequisitionstatuts.REVS.toString()){
        // ----------------->>> Lancer à la révision.
            if (![Purchaserequisitionstatuts.BRLN.toString()].includes(purchreq.refpurchaserequisitionstatuts)) {
                errormessage = 'le statut '+purchreq.refpurchaserequisitionstatuts+'ne permet pas de lancer la révision!';

            } else {
                await this.verifyPurchReqLinesToReview({refpurchaserequisition: purchaserequisitionChangeStatutDto.refpurchaserequisition, refcompany: purchaserequisitionChangeStatutDto.refcompany, refvendor: undefined, id: undefined})
                purchreq.refpurchaserequisitionstatuts = purchaserequisitionChangeStatutDto.refpurchaserequisitionstatuts;
                purchreq.datesubmittion = new Date();
                purchreq.submittedby = purchaserequisitionChangeStatutDto.matricule;
            }
        } else if (purchaserequisitionChangeStatutDto.refpurchaserequisitionstatuts ===  Purchaserequisitionstatuts.APRV.toString()){
        // ----------------->>> Approuver la DA.
            if (![Purchaserequisitionstatuts.REVS.toString()].includes(purchreq.refpurchaserequisitionstatuts)) {
                errormessage = 'le statut '+purchreq.refpurchaserequisitionstatuts+'ne permet pas d\'approuver la DA!';

            } else {
                await this.verifyPurchReqLinesToApprove({refpurchaserequisition: purchaserequisitionChangeStatutDto.refpurchaserequisition, refcompany: purchaserequisitionChangeStatutDto.refcompany, refvendor: undefined, id: undefined})
                const taxeAffectation = await this.purchreqlinesRepository.createQueryBuilder('purchaserequisitionlines')
                    .select('DISTINCT reftaxe, reftaxegroup')
                    .where('refpurchaserequisition = :refpurchaserequisition', { refpurchaserequisition :purchaserequisitionChangeStatutDto.refpurchaserequisition })
                    .andWhere('refcompany = :refcompany', { refcompany: purchaserequisitionChangeStatutDto.refcompany })
                    //.distinctOn(['reftaxe', 'reftaxegroup'])
                    .getRawMany();
                await this.masterdataService.isTaxeAffectationCorrect(
                    taxeAffectation ,
                    purchaserequisitionChangeStatutDto.refcompany
                )
                purchreq.refpurchaserequisitionstatuts = purchaserequisitionChangeStatutDto.refpurchaserequisitionstatuts;
                purchreq.dateapprovement = new Date();
                purchreq.approvedby = purchaserequisitionChangeStatutDto.matricule;
            }
        } else if (purchaserequisitionChangeStatutDto.refpurchaserequisitionstatuts ===  Purchaserequisitionstatuts.CLTR.toString()){
        // ----------------->>> Clôturer la DA.
            if (![Purchaserequisitionstatuts.APRV.toString()].includes(purchreq.refpurchaserequisitionstatuts)) {
                errormessage = 'le statut '+purchreq.refpurchaserequisitionstatuts+'ne permet pas de clôturer la DA!';

            } else {
                await this.generatePurchaseOrder(purchaserequisitionChangeStatutDto.refpurchaserequisition, purchaserequisitionChangeStatutDto.refcompany)
                purchreq.refpurchaserequisitionstatuts = purchaserequisitionChangeStatutDto.refpurchaserequisitionstatuts;
                purchreq.dateclosing = new Date();
                purchreq.closedby = purchaserequisitionChangeStatutDto.matricule;
            }
        } else if (purchaserequisitionChangeStatutDto.refpurchaserequisitionstatuts ===  Purchaserequisitionstatuts.RJCT.toString()){
        // ----------------->>> Rejeter la DA.
            if (![Purchaserequisitionstatuts.APRV.toString()].includes(purchreq.refpurchaserequisitionstatuts)) {
                errormessage = 'le statut '+purchreq.refpurchaserequisitionstatuts+'ne permet pas de rejeter la DA!';

            } else {
                purchreq.refpurchaserequisitionstatuts = purchaserequisitionChangeStatutDto.refpurchaserequisitionstatuts;
                purchreq.daterejection = new Date();
                purchreq.rejectedby = purchaserequisitionChangeStatutDto.matricule;
            }
        }

        if(!['', null, undefined].includes(errormessage)) {
            throw new BadRequestException(errormessage, { cause: errormessage, description: errormessage,});
        }

        return await this.purchreqRepository
            .save(purchreq)
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async isPurchReqStatut(purchaserequisition, statut) {
        const purchreq = await this.purchreqRepository. findOneBy({
            refpurchaserequisition: purchaserequisition.refpurchaserequisition,
            refcompany: purchaserequisition.refcompany,
        });

        if(purchreq) {
            if (purchreq?.refpurchaserequisitionstatuts !== statut) {
                const message = 'Statut invalide' + purchreq.refpurchaserequisitionstatuts;

                throw new BadRequestException(message, { cause: message, description: message,});
            }
        }
    }

    async generatePurchaseOrder(refpurchaserequisition, refcompany) {
        const pos = await this.purchorderService.getPurchOrder({
            refcompany: refcompany,
            refpurchaserequisition: refpurchaserequisition,
            refpurchaseorder: undefined,
        })
        if (pos.length > 0) {
            const message = 'Purchase order already exist !';

            throw new BadRequestException(message, { cause: message, description: message,});
        }
        await this.purchreqlinesRepository
            .createQueryBuilder('purchaserequisitionlines')
            .where('refpurchaserequisition = :refpurchaserequisition', { refpurchaserequisition :refpurchaserequisition })
            .andWhere('refcompany = :refcompany', { refcompany: refcompany })
            .distinctOn(['refpurchaserequisition', 'refvendor'])
            .getMany()
            .then(async (res) => {
                const pos = [];
                let pols = [];
                for await (const po of res){
                    pos.push({
                        refvendor: po.refvendor,
                        refpurchaserequisition: po.refpurchaserequisition,
                        refpurchaseorderstatuts: Purchaseorderstatuts.BRLN,
                        refpurchaseorder: await this.masterdataService.generatepk('PO'),
                        refcompany: refcompany,
                        refcurrency: po.refcurrency,
                        reftaxegroup: po.reftaxegroup,
                    })
                }
                const posEntity = await this.purchorderService.bulkPurchOrder(pos);
                for await (const po of posEntity) {
                    const prls = await this.getPurchReqLines({
                        refcompany: po.refcompany,
                        refpurchaserequisition: po.refpurchaserequisition,
                        id: undefined,
                        refvendor: po.refvendor,
                    });
                    pols = [];
                    for await (const prl of prls){
                        pols.push({
                            idlinepurchaserequisition: prl.id,
                            refpurchaseorder: po.refpurchaseorder,
                            refcompany: prl.refcompany,
                            refitem: prl.refitem,
                            quantity: prl.quantity,
                            price: prl.price,
                            idheaderparametre: prl.idheaderparametre,
                            lineamountttcvalue: prl.lineamountttcvalue,
                            lineamounttvavalue: prl.lineamounttvavalue,
                            lineamounthtvalue: prl.lineamounthtvalue,
                            linepricehtvalue: prl.linepricehtvalue,
                            linepricettcvalue: prl.linepricettcvalue,
                            discountvalue: prl.discountvalue,
                            discountpercentage: prl.discountpercentage,
                            reftaxe: prl.reftaxe,
                            taxevalue: prl.taxevalue,

                        })
                    }
                    await this.purchorderService.bulkPurchOrderLines(pols);
                }
                return 'Purchase order created succefuly'

            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    //-------------------------------------------------------------> PURCHASEREQUISITION LINES -----------
    async findPurchReqLinesIfExist(purchaserequisitionlinesfindDto: PurchaserequisitionLinesFindByIdDto) {
        const ptline = await this.purchreqlinesRepository.findOneBy({
            id: purchaserequisitionlinesfindDto.id,
            refpurchaserequisition: purchaserequisitionlinesfindDto.refpurchaserequisition,
            refcompany: purchaserequisitionlinesfindDto.refcompany,
        });
        //  ---------------  ---------------  ---------------  ---------------  ---------------
        if (!ptline) {
            const message = 'Ligne de DA introuvable';

            throw new BadRequestException(message, { cause: message, description: message,});
        } else {
            return ptline;
        }
    }

    async getPurchReqLines (purchaserequisitionlinesFindDto: PurchaserequisitionLinesFindDto) {
        const purchreqLines = await this.purchreqlinesRepository
            .createQueryBuilder('purchaserequisitionlines')
            .leftJoinAndSelect('purchaserequisitionlines.item', 'item')
            .leftJoinAndSelect('item.categoriesaffectation', 'categoriesaffectations')
            .leftJoinAndSelect('item.unitpurch', 'unit unitpurch')
            .leftJoinAndSelect('item.unitinvent', 'unit unitinvent')
            .leftJoinAndSelect('item.taxepurchase', 'taxe taxeitem')
            .leftJoinAndSelect('parametresheader.parametreslines', 'parametreslines')
            .leftJoinAndSelect('purchaserequisitionlines.vendor', 'vendor')
            .leftJoinAndSelect('vendor.currency', 'currency')
            .leftJoinAndSelect('vendor.vendorgroup', 'vendorgroup')
            .leftJoinAndSelect('purchaserequisitionlines.taxepurchreqline', 'taxe')
            .leftJoinAndSelect('purchaserequisitionlines.taxegrouppurchreqline', 'taxegroup')
            .where('purchaserequisitionlines.refcompany = :refcompany', {refcompany: purchaserequisitionlinesFindDto.refcompany})
            .andWhere('purchaserequisitionlines.refpurchaserequisition = :refpurchaserequisition', {refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition})

        if (purchaserequisitionlinesFindDto.id) {
            purchreqLines.andWhere('purchaserequisitionlines.id = :id', {id: purchaserequisitionlinesFindDto.id})
        }

        if (purchaserequisitionlinesFindDto.refvendor) {
            purchreqLines.andWhere('purchaserequisitionlines.refvendor = :refvendor', {refvendor: purchaserequisitionlinesFindDto.refvendor})
        }

        return purchreqLines
            .orderBy('purchaserequisitionlines.id','DESC')
            .getMany()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async updateLineHtPrice(price, discountvalue, discountpercentage){
        const linepricetht = ((price - discountvalue) - ((price - discountvalue) * discountpercentage / 100))
        if (linepricetht <= 0.00){
            const message = 'Price line is invalide please chek the price an the discounts !'

            throw new BadRequestException(message, { cause: message, description: message,});
        } else {
            return linepricetht;
        }
    }

    async upsertPurchReqLinePrice(purchaserequisitionlinesFindDto: PurchaserequisitionLinesPriceUpsertDto){
        // Validation de statut d'action
        await this.isPurchReqStatut(
            {
                refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
                refcompany: purchaserequisitionlinesFindDto.refcompany
            },
            Purchaserequisitionstatuts.REVS.toString()
        )

        const ptline = await this.findPurchReqLinesIfExist({
            id: purchaserequisitionlinesFindDto.id,
            refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
            refcompany: purchaserequisitionlinesFindDto.refcompany,
        })
        let message = '';
        if([undefined, null, ''].includes(ptline.refitem)){
            message = 'Il faut spécifier un item pour la ligne achat '+purchaserequisitionlinesFindDto.id+' !'

            throw new BadRequestException(message, { cause: message, description: message,});
        }
        //Validation de vendor.
        await this.masterdataService.isVendorValid({
            refcompany: purchaserequisitionlinesFindDto.refcompany,
            refvendor: ptline.refvendor
        });
        // Validation d'item
        await this.itemService.isItemValid({
                refcompany: purchaserequisitionlinesFindDto.refcompany,
                refitem: ptline.refitem
            },
            'PURCHORDER'
        );

        ptline.price = purchaserequisitionlinesFindDto.price;
        ptline.linepricehtvalue = await this.updateLineHtPrice(ptline.price, ptline.discountvalue, ptline.discountpercentage);
        ptline.linepricettcvalue = (ptline.linepricehtvalue * ptline.taxevalue / 100) + ptline.linepricehtvalue;
        ptline.lineamounthtvalue = ptline.linepricehtvalue * ptline.quantity;
        ptline.lineamountttcvalue = ptline.linepricettcvalue * ptline.quantity;
        ptline.lineamounttvavalue = ptline.lineamountttcvalue - ptline.lineamounthtvalue;

        return await this.purchreqlinesRepository
            .save(ptline)
            .then(async (res) => {
                return await this.getPurchReqLines({
                    refcompany: purchaserequisitionlinesFindDto.refcompany,
                    refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
                    id: res.id,
                    refvendor: undefined,
                });
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async upsertPurchReqLineDiscountValue(purchaserequisitionlinesFindDto: PurchaserequisitionLinesDiscountValueUpsertDto){
        // Validation de statut d'action
        await this.isPurchReqStatut(
            {
                refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
                refcompany: purchaserequisitionlinesFindDto.refcompany
            },
            Purchaserequisitionstatuts.REVS.toString()
        )

        const ptline = await this.findPurchReqLinesIfExist({
            id: purchaserequisitionlinesFindDto.id,
            refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
            refcompany: purchaserequisitionlinesFindDto.refcompany,
        })
        let message = '';
        if([undefined, null, ''].includes(ptline.refitem)){
            message = 'Il faut spécifier un item pour la ligne achat '+purchaserequisitionlinesFindDto.id+' !'

            throw new BadRequestException(message, { cause: message, description: message,});
        }
        //Validation de vendor.
        await this.masterdataService.isVendorValid({
            refcompany: purchaserequisitionlinesFindDto.refcompany,
            refvendor: ptline.refvendor
        });
        // Validation d'item
        await this.itemService.isItemValid({
                refcompany: purchaserequisitionlinesFindDto.refcompany,
                refitem: ptline.refitem
            },
            'PURCHORDER'
        );

        ptline.discountvalue = purchaserequisitionlinesFindDto.discountvalue;
        ptline.linepricehtvalue = await this.updateLineHtPrice(ptline.price, ptline.discountvalue, ptline.discountpercentage);
        ptline.linepricettcvalue = (ptline.linepricehtvalue * ptline.taxevalue / 100) + ptline.linepricehtvalue;
        ptline.lineamounthtvalue = ptline.linepricehtvalue * ptline.quantity;
        ptline.lineamountttcvalue = ptline.linepricettcvalue * ptline.quantity;
        ptline.lineamounttvavalue = ptline.lineamountttcvalue - ptline.lineamounthtvalue;

        return await this.purchreqlinesRepository
            .save(ptline)
            .then(async (res) => {
                return await this.getPurchReqLines({
                    refcompany: purchaserequisitionlinesFindDto.refcompany,
                    refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
                    id: res.id,
                    refvendor: undefined,
                });
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async upsertPurchReqLineDiscountPercentage(purchaserequisitionlinesFindDto: PurchaserequisitionLinesDiscountPercentageUpsertDto){
        // Validation de statut d'action
        await this.isPurchReqStatut(
            {
                refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
                refcompany: purchaserequisitionlinesFindDto.refcompany
            },
            Purchaserequisitionstatuts.REVS.toString()
        )

        const ptline = await this.findPurchReqLinesIfExist({
            id: purchaserequisitionlinesFindDto.id,
            refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
            refcompany: purchaserequisitionlinesFindDto.refcompany,
        })
        let message = '';
        if([undefined, null, ''].includes(ptline.refitem)){
            message = 'Il faut spécifier un item pour la ligne achat '+purchaserequisitionlinesFindDto.id+' !'

            throw new BadRequestException(message, { cause: message, description: message,});
        }
        //Validation de vendor.
        await this.masterdataService.isVendorValid({
            refcompany: purchaserequisitionlinesFindDto.refcompany,
            refvendor: ptline.refvendor
        });
        // Validation d'item
        await this.itemService.isItemValid({
                refcompany: purchaserequisitionlinesFindDto.refcompany,
                refitem: ptline.refitem
            },
            'PURCHORDER'
        );

        ptline.discountpercentage = purchaserequisitionlinesFindDto.discountpercentage;
        ptline.linepricehtvalue = await this.updateLineHtPrice(ptline.price, ptline.discountvalue, ptline.discountpercentage);
        ptline.linepricettcvalue = (ptline.linepricehtvalue * ptline.taxevalue / 100) + ptline.linepricehtvalue;
        ptline.lineamounthtvalue = ptline.linepricehtvalue * ptline.quantity;
        ptline.lineamountttcvalue = ptline.linepricettcvalue * ptline.quantity;
        ptline.lineamounttvavalue = ptline.lineamountttcvalue - ptline.lineamounthtvalue;

        return await this.purchreqlinesRepository
            .save(ptline)
            .then(async (res) => {
                return await this.getPurchReqLines({
                    refcompany: purchaserequisitionlinesFindDto.refcompany,
                    refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
                    id: res.id,
                    refvendor: undefined,
                });
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async upsertPurchReqLineQty(purchaserequisitionlinesFindDto: PurchaserequisitionLinesQtyUpsertDto){
        // Validation de statut d'action
        await this.isPurchReqStatut(
            {
                refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
                refcompany: purchaserequisitionlinesFindDto.refcompany
            },
            Purchaserequisitionstatuts.BRLN.toString()
        )

        const ptline = await this.findPurchReqLinesIfExist({
            id: purchaserequisitionlinesFindDto.id,
            refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
            refcompany: purchaserequisitionlinesFindDto.refcompany,
        })
        let message = '';
        if([undefined, null, ''].includes(ptline.refitem)){
            message = 'Il faut spécifier un item pour la ligne achat '+purchaserequisitionlinesFindDto.id+' !'

            throw new BadRequestException(message, { cause: message, description: message,});
        }
        // Validation d'item
        await this.itemService.isItemValid({
                refcompany: purchaserequisitionlinesFindDto.refcompany,
                refitem: ptline.refitem
            },
            'PURCHORDER'
        );

        ptline.quantity = purchaserequisitionlinesFindDto.quantity;

        return await this.purchreqlinesRepository
            .save(ptline)
            .then(async (res) => {
                return await this.getPurchReqLines({
                    refcompany: purchaserequisitionlinesFindDto.refcompany,
                    refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
                    id: res.id,
                    refvendor: undefined,
                });
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async upsertPurchReqLineItem(purchaserequisitionlinesFindDto: PurchaserequisitionLinesItemUpdateDto){
        // Validation de statut d'action
        await this.isPurchReqStatut(
            {
                refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
                refcompany: purchaserequisitionlinesFindDto.refcompany
            },
            Purchaserequisitionstatuts.BRLN.toString()
        )

        const ptline = await this.findPurchReqLinesIfExist({
            id: purchaserequisitionlinesFindDto.id,
            refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
            refcompany: purchaserequisitionlinesFindDto.refcompany,
        })
        // Validation d'item
        await this.itemService.isItemValid({
                refcompany: purchaserequisitionlinesFindDto.refcompany,
                refitem: purchaserequisitionlinesFindDto.refitem
            },
            'PURCHORDER'
        );

        // Item vérification
        const itemEntity = await this.itemService.findItem({
            refitem: purchaserequisitionlinesFindDto.refitem,
            refcompany: purchaserequisitionlinesFindDto.refcompany,
            item: undefined,
            searchname: undefined,
            barcode: undefined,
            itemdescription: undefined,
        });

        ptline.refitem = itemEntity[0].refitem;
        //ptline.reftaxe = itemEntity[0].reftaxepurchase;
        //const taxeline = await this.masterdataService.getCurrentTaxeLineValue({refcompany: purchaserequisitionlinesFindDto.refcompany, reftaxe: itemEntity[0].reftaxepurchase, datedebut: undefined})
        //ptline.taxevalue = taxeline[0].percentage;
        //ptline.idheaderparametre = itemEntity[0].idheaderparametre;

        return await this.purchreqlinesRepository
            .save(ptline)
            .then(async (res) => {
                return await this.getPurchReqLines({
                    refcompany: purchaserequisitionlinesFindDto.refcompany,
                    refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
                    id: res.id,
                    refvendor: undefined,
                });
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async updatePurchReqLineAxesAnalytics(purchaserequisitionlinesaxeanalyticsDto: PurchaserequisitionLinesAxeAnalyticsDto) {
        // Validation de statut d'action.
        await this.isPurchReqStatut(
            {
                refpurchaserequisition: purchaserequisitionlinesaxeanalyticsDto.refpurchaserequisition,
                refcompany: purchaserequisitionlinesaxeanalyticsDto.refcompany
            },
            Purchaserequisitionstatuts.BRLN.toString()
        )

        // Ligne de DA invalid.
        const ptline = await this.findPurchReqLinesIfExist({
            id: purchaserequisitionlinesaxeanalyticsDto.id,
            refpurchaserequisition: purchaserequisitionlinesaxeanalyticsDto.refpurchaserequisition,
            refcompany: purchaserequisitionlinesaxeanalyticsDto.refcompany,
        })

        const idheaderparametre = await this.parametreService.checkaxesbycompany(
            purchaserequisitionlinesaxeanalyticsDto.reforganisation,
            purchaserequisitionlinesaxeanalyticsDto.parametres,
            purchaserequisitionlinesaxeanalyticsDto.refcompany,
            'ANALYTIC'
        );
        purchaserequisitionlinesaxeanalyticsDto.idheaderparametre = Number(idheaderparametre);

        const purchreq = await this.purchreqlinesRepository.create(purchaserequisitionlinesaxeanalyticsDto);
        return await this.purchreqlinesRepository
            .save(purchreq)
            .then(async (res) => {
                return await this.getPurchReqLines({
                    refcompany: purchaserequisitionlinesaxeanalyticsDto.refcompany,
                    refpurchaserequisition: purchaserequisitionlinesaxeanalyticsDto.refpurchaserequisition,
                    id: res.id,
                    refvendor: undefined,
                });
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async updateVendor(purchaserequisitionlinesFindDto: PurchaserequisitionLinesVendorUpdateDto){
        // Validation de statut d'action.
        await this.isPurchReqStatut(
            {
                refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
                refcompany: purchaserequisitionlinesFindDto.refcompany
            },
            Purchaserequisitionstatuts.REVS.toString()
        )
        await this.masterdataService.isVendorValid({ refcompany: purchaserequisitionlinesFindDto.refcompany, refvendor: purchaserequisitionlinesFindDto.refvendor })
        const vendor = await this.masterdataService.getVendor({refcompany: purchaserequisitionlinesFindDto.refcompany, refvendor: purchaserequisitionlinesFindDto.refvendor})
        // Ligne de DA invalid.
        const ptline = await this.findPurchReqLinesIfExist({
            id: purchaserequisitionlinesFindDto.id,
            refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
            refcompany: purchaserequisitionlinesFindDto.refcompany,
        })

        ptline.refvendor = purchaserequisitionlinesFindDto.refvendor;
        ptline.refcurrency = vendor[0].refcurrency;
        //ptline.reftaxegroup = vendor[0].reftaxegroup;

        return await this.purchreqlinesRepository
            .save(ptline)
            .then(async (res) => {
                return await this.getPurchReqLines({
                    refcompany: purchaserequisitionlinesFindDto.refcompany,
                    refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition,
                    id: res.id,
                    refvendor: undefined,
                });
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async deletePurchReqLine(purchaserequisitionlinesDeleteDto: PurchaserequisitionLinesDeleteDto) {
        // Validation de statut d'action.
        await this.isPurchReqStatut(
            {
                refpurchaserequisition: purchaserequisitionlinesDeleteDto.refpurchaserequisition,
                refcompany: purchaserequisitionlinesDeleteDto.refcompany
            },
            Purchaserequisitionstatuts.BRLN.toString()
        )

        // Ligne de DA invalid.
        const ptline = await this.findPurchReqLinesIfExist({
            id: purchaserequisitionlinesDeleteDto.id,
            refpurchaserequisition: purchaserequisitionlinesDeleteDto.refpurchaserequisition,
            refcompany: purchaserequisitionlinesDeleteDto.refcompany,
        })

        return await this.purchreqlinesRepository
            .remove(ptline)
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async initPurchReqLines(refpurchaserequisition, refcompany){
        if([undefined, null, '', 0].includes(refpurchaserequisition) || [undefined, null, '', 0].includes(refcompany)) {
            const message = 'company ou purchase requisition invalide';

            throw new BadRequestException(message, { cause: message, description: message,});
        }
        return await this.purchreqlinesRepository
            .createQueryBuilder()
            .update(PurchaserequisitionLinesEntity)
            .set({
                refvendor: null,
                price: 0,
                discountpercentage: 0,
                discountvalue: 0,
                lineamountttcvalue: 0,
                lineamounttvavalue: 0,
                linepricettcvalue: 0,
                reftaxegroup: null,
                lineamounthtvalue: 0,
                linepricehtvalue: 0,
                refcurrency: null
            })
            .where("refcompany = :refcompany and refpurchaserequisition = :refpurchaserequisition ", { refcompany: refcompany, refpurchaserequisition: refpurchaserequisition })
            .execute()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async verifyPurchReqLinesToReview(purchaserequisitionlinesFindDto: PurchaserequisitionLinesFindDto){
        return await this.purchreqlinesRepository.findBy({
            refcompany: purchaserequisitionlinesFindDto.refcompany,
            refpurchaserequisition: purchaserequisitionlinesFindDto.refpurchaserequisition
        })
            .then(async (linesPurchReq) => {
                const alreadytraiteddata : {refitem: string}[] = [];
                let message = '';
                for(let i = 0; i< linesPurchReq.length; i++) {

                    if ([undefined, null, ''].includes(linesPurchReq[i].refitem)) {
                        message = 'Il faut spécifier un item pour la ligne achat ' + linesPurchReq[i].id + ' !'

                        throw new BadRequestException(message, {cause: message, description: message,});
                    }

                    if (linesPurchReq[i].quantity <= 0) {
                        message = 'Quantité invalide pour la ligne achat ' + linesPurchReq[i].id + ' !'

                        throw new BadRequestException(message, {cause: message, description: message,});
                    }

                    if (alreadytraiteddata.find(prline => prline.refitem === linesPurchReq[i].refitem ) == undefined) {
                        alreadytraiteddata.push({refitem: linesPurchReq[i].refitem})
                        await this.itemService.isItemValid({
                            refcompany: linesPurchReq[i].refcompany,
                            refitem: linesPurchReq[i].refitem
                        }, 'PURCHORDER')
                    }
                }
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });

    }

    async verifyPurchReqLinesToApprove(purchaserequisitionlinesFindDto: PurchaserequisitionLinesFindDto) {
        await this.purchreqlinesRepository
            .createQueryBuilder('purchaserequisitionlines')
            .where('refpurchaserequisition = :refpurchaserequisition and refcompany = :refcompany', { refcompany: purchaserequisitionlinesFindDto.refcompany, refpurchaserequisition :purchaserequisitionlinesFindDto.refpurchaserequisition })
            .andWhere('(coalesce(quantity, 0) <= 0 or coalesce(price, 0) <= 0 or refvendor is null or reftaxegroup is null or refcurrency is null or reftaxe is null or refitem is null)')
            .getCount()
            .then(async (res) => {
                if ( res > 0){
                    const message = 'Merci de saisir les quantités, les prix et les fournisseurs de toutes les lignes de DA'
                    throw new BadRequestException(message, { cause: message, description: message,});
                }
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async newPurchReqLineItem(purchaserequisitionlinesdDto: PurchaserequisitionLinesNewDto){
        const purchLine = new PurchaserequisitionLinesEntity()
        purchLine.refcompany = purchaserequisitionlinesdDto.refcompany;
        purchLine.refpurchaserequisition = purchaserequisitionlinesdDto.refpurchaserequisition;
        await this.purchreqlinesRepository
            .save(purchLine)
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async updateTaxe(purchaserequisitionlineDto: PurchaserequisitionLinesTaxeUpdateDto) {
        // Validation de statut d'action
        await this.isPurchReqStatut(
            {
                refpurchaserequisition: purchaserequisitionlineDto.refpurchaserequisition,
                refcompany: purchaserequisitionlineDto.refcompany
            },
            Purchaserequisitionstatuts.REVS.toString()
        )

        const ptline = await this.findPurchReqLinesIfExist({
            id: purchaserequisitionlineDto.id,
            refpurchaserequisition: purchaserequisitionlineDto.refpurchaserequisition,
            refcompany: purchaserequisitionlineDto.refcompany,
        })
        let message = '';
        if([undefined, null, ''].includes(ptline.refitem)){
            message = 'Il faut spécifier un item pour la ligne achat '+purchaserequisitionlineDto.id+' !'

            throw new BadRequestException(message, { cause: message, description: message,});
        }
        //Validation de vendor.
        await this.masterdataService.isVendorValid({
            refcompany: purchaserequisitionlineDto.refcompany,
            refvendor: ptline.refvendor
        });
        // Validation d'item
        await this.itemService.isItemValid({
                refcompany: purchaserequisitionlineDto.refcompany,
                refitem: ptline.refitem
            },
            'PURCHORDER'
        );

        ptline.reftaxe = purchaserequisitionlineDto.reftaxe;
        const taxeline = await this.masterdataService.getCurrentTaxeLineValue({refcompany: purchaserequisitionlineDto.refcompany, reftaxe: purchaserequisitionlineDto.reftaxe, datedebut: undefined})
        ptline.taxevalue = taxeline[0].percentage;
        ptline.linepricehtvalue = await this.updateLineHtPrice(ptline.price, ptline.discountvalue, ptline.discountpercentage);
        ptline.linepricettcvalue = (ptline.linepricehtvalue * ptline.taxevalue / 100) + ptline.linepricehtvalue;
        ptline.lineamounthtvalue = ptline.linepricehtvalue * ptline.quantity;
        ptline.lineamountttcvalue = ptline.linepricettcvalue * ptline.quantity;
        ptline.lineamounttvavalue = ptline.lineamountttcvalue - ptline.lineamounthtvalue;

        return await this.purchreqlinesRepository
            .save(ptline)
            .then(async (res) => {
                return await this.getPurchReqLines({
                    refcompany: purchaserequisitionlineDto.refcompany,
                    refpurchaserequisition: purchaserequisitionlineDto.refpurchaserequisition,
                    id: res.id,
                    refvendor: undefined,
                });
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }
}
