import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ParametreCreateDto } from "./DTO/parametre-create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { ParametresEntity } from "../../../entities/arazan-db/parametres/parametres.entity";
import { ParametresFindDto } from "./DTO/parametres-find.dto";
import { ParametresShowDto } from "./DTO/./parametres-show.dto";
import { ParametresAttributEntity } from "../../../entities/arazan-db/parametres/parametres-attribut.entity";
import { ParametresAttributeCreatDto } from "./DTO/parametres-attribute-creat.dto";
import { ParametresAttributeFindDto } from "./DTO/parametres-attribute-find.dto";
import { ParametresAttributeShowDto } from "./DTO/parametres-attribute-show.dto";
import { ParametresHeaderEntity } from "../../../entities/arazan-db/parametres/parametres-header.entity";
import { ParametresLineEntity } from "../../../entities/arazan-db/parametres/parametres-line.entity";
import { ParametresTypesEntity } from "../../../entities/arazan-db/parametres/parametres-types.entity";
import {ParametresHeaderFindDto} from "./DTO/parametres-header-find.dto";

@Injectable({})
export class ParametresService {
  constructor(
    @InjectRepository(ParametresEntity)
    private readonly parameterRepository: Repository<ParametresEntity>,

    @InjectRepository(ParametresTypesEntity)
    private readonly typeParameterRepository: Repository<ParametresTypesEntity>,

    @InjectRepository(ParametresAttributEntity)
    private readonly attributparametreRepository: Repository<ParametresAttributEntity>,

    @InjectRepository(ParametresHeaderEntity)
    private readonly parametreheaderRepository: Repository<ParametresHeaderEntity>,

    @InjectRepository(ParametresLineEntity)
    private readonly parametrelinesRepository: Repository<ParametresLineEntity>,
  ) {}

  /** OK **/
  async findTypeParametre() {
    return await this.typeParameterRepository
      .find();
  }

  /** OK **/
  async createParametre(parametreDto: ParametreCreateDto) {
    const order = await this.getOrderParametre(
      parametreDto.refcompany,
      parametreDto.reftypeparametre,
    );
    const parametre = await this.parameterRepository.create(
      parametreDto
    ); // transform the DTO to the entity user
    parametre.order = Number(order);
    return await this.parameterRepository
      .save(parametre)
      .then(async (res) => {
        await this.createAttributparametre(
          {
            value: 'NA',
            actif: true,
            refcompany: parametre.refcompany,
            refparametre: parametre.refparametre,
            isdefault: true,
          }
        )
          .then(async (res) => {
            return await this.parameterRepository.findOneBy(
              parametreDto
            );
          })
          .catch((err) => {
            throw new BadRequestException(err.message, { cause: err, description: err.query,});
          });
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }
  /** OK **/
  async findParametre(parametreDto: ParametresFindDto) {
    return await this.parameterRepository
      .createQueryBuilder('parametres')
      .leftJoinAndSelect(
        'parametres.parametresattributs',
        'parametresattributs',
      )
      .innerJoinAndSelect(
        'parametres.company',
        'company',
        'company.refcompany = COALESCE(:refcompany, company.refcompany)',
        {
          refcompany: parametreDto.refcompany,
        },
      )
      .innerJoinAndSelect(
        'parametres.parametrestype',
        'parametrestypes',
        'parametrestypes.reftypeparametre = COALESCE(:reftypeparameter, parametrestypes.reftypeparametre)',
        {
          reftypeparameter: parametreDto?.reftypeparametre || undefined,
        },
      )
      .leftJoinAndSelect(
        'parametresattributs.parametreslines',
        'parametreslines',
        'parametreslines.idheaderparametre = :idheaderparametre',
        {
          idheaderparametre: parametreDto?.idheaderparametre || undefined,
        },
      )
      .getMany();
  }
  /** OK **/
  async showParametre(parametreDto: ParametresShowDto) {
    return await this.parameterRepository
      .createQueryBuilder('parametres')
      .innerJoinAndSelect('parametres.company', 'company')
      .innerJoinAndSelect('parametres.parametrestype', 'parametrestypes',)
      .where('parametres.refparametre = :refparametre', {refparametre: parametreDto?.refparametre || undefined,})
      .andWhere('parametres.refcompany = :refcompany', {refcompany: parametreDto.refcompany,})
      .getOne()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  /** OK **/
  async createAttributparametre(attributparametreDto: ParametresAttributeCreatDto) {
    const attributparameter = await this.attributparametreRepository.create(attributparametreDto);
    return await this.attributparametreRepository
      .save(attributparameter)
      .then(async (res) => {
        return await this.attributparametreRepository.findOneBy(attributparametreDto);
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }
  /** OK **/
  async findAttributParametre(attributparametreDto: ParametresAttributeFindDto) {
    return await this.attributparametreRepository
      .createQueryBuilder('parametresattributs')
      .innerJoinAndSelect(
        'parametresattributs.parametre',
        'parametre',
        'parametre.refparametre = :refparametre',
        {
          refparametre: attributparametreDto?.refparametre || undefined,
        },
      )
      .innerJoinAndSelect(
        'parametresattributs.company',
        'company',
        'company.refcompany = :refcompany',
        {
          refcompany: attributparametreDto.refcompany,
        },
      )
      .innerJoinAndSelect(
        'parametre.parametrestype',
        'parametrestypes'
      )
      .orderBy(
        'parametre.refparametre',
        'ASC'
      )
      .getMany();
  }
  /** OK **/
  async showAttributparametre(attributparametredto: ParametresAttributeShowDto) {
    return await this.attributparametreRepository
      .createQueryBuilder('parametresattributs')
      .innerJoinAndSelect('parametresattributs.parametre', 'parametre')
      .innerJoinAndSelect('parametresattributs.company', 'company')
      .where(
        'parametre.refparametre = :refparametre',
        { refparametre: attributparametredto.refparametre }
      )
      .andWhere(
        'parametre.refcompany = :refcompany',
        { refcompany: attributparametredto.refcompany }
      )
      .andWhere(
        'parametresattributs.value = :value',
        { value: attributparametredto.value }
      )
      .getOne()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  /** OK **/
  /**
   *
   * @param parametreListe
   * @param refcompany
   * this function return true or false depending on the result of cheking the correctness of data sended.
   * it check if all the parametres axes sended in the variable AXESISTE are figured on the parametres axes taked rom the DB by company.
   * beside, it look if all the parametres axes taked from the DB by company are figured on the list passed in parameters.
   */
  async checkaxesbycompany(parametreListe: object, refcompany: string, reftypeparametre: string) {
    return await this.findParametre({
        refcompany: refcompany,
        reftypeparametre: reftypeparametre,
        parametre: undefined,
        refparametre: undefined,
        idheaderparametre: undefined,
      })
      .then(async (res) => {
        // -----------------------------------------------------------> Vérifier les parametres par type de parametre .
        const parametreListeKey = Object.keys(parametreListe);
        const parametresfromdbbycompany = [];
        for (const element of res) {
          parametresfromdbbycompany.push({ refparametre: element.refparametre, order: element.order });
        }
        const axesfromdbbycompanyMapped = parametresfromdbbycompany.map( item => item.refparametre );
        for (const key of parametreListeKey) {
          if (!axesfromdbbycompanyMapped.includes(key)) {
            throw new InternalServerErrorException('Vous avez envoyer un paramétres non paramétrer, veuilliez contacter votre administrateur', { cause: {message : 'Vous avez envoyer un paramétre non paramétrer, veuilliez contacter votre administrateur'}, description: 'Vous avez envoyer un paramétres non paramétrer, veuilliez contacter votre administrateur',});
          }
        }
        for (const value of axesfromdbbycompanyMapped) {
          if (!parametreListeKey.includes(value)) {
            throw new InternalServerErrorException('les paramétres sont changés, veuilliez relancer à nouveau', { cause: {message : 'les paramétres sont changés, veuilliez relancer à nouveau'}, description: 'les paramétres son changés, veuilliez relancer à nouveau',});
            // return false; // A value from the axes in DB by company is not a key in the list given in parameters
          }
        }
        // -----------------------------------------------------------> Générer le référence de header des axes analytique.
        parametresfromdbbycompany.sort((a, b) => a.order - b.order);
        const concatenatedValues = parametresfromdbbycompany.map( entry => parametreListe[entry.refparametre] );
        const refheaderparametre = concatenatedValues.join('--');
        // -----------------------------------------------------------> Vérifier l'existance de header des axe analytique.
        let parametreheaderentity = await this.parametreheaderRepository.findOneBy({ refcompany: refcompany, refheaderparametre: refheaderparametre });
        if (!parametreheaderentity) {
          parametreheaderentity = await this.parametreheaderRepository.create({ refcompany: refcompany, refheaderparametre: refheaderparametre, reftypeparametre: reftypeparametre })
          parametreheaderentity = await this.parametreheaderRepository.save( parametreheaderentity );
          // ---------------------------------------------------------------> Création de lignes des axes parametres.
          const parametrelines = Object.keys(parametreListe).map((key) => ({
            refparametre: key,
            value: parametreListe[key],
            refcompany: refcompany,
            idheaderparametre: parametreheaderentity.idheaderparametre,
          }));
          await this.parametrelinesRepository.insert(parametrelines);
        }
        return parametreheaderentity.idheaderparametre; // All conditions are met
      })
      .catch((err) => {
        throw new InternalServerErrorException(err.message, { cause: err, description: err.query,});
      });
  }
  /** OK **/
  async getOrderParametre(refcompany, reftypeparametre) {
    return await this.parameterRepository
      .countBy({
        refcompany: refcompany,
        reftypeparametre: reftypeparametre,
      })
      .then(async (res) => {
        return res + 1;
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });
  }

  async getIdHeaderByParametre(headerparametrerDto: ParametresHeaderFindDto) {
    return this.checkaxesbycompany(
        headerparametrerDto.parametres,
        headerparametrerDto.refcompany,
        headerparametrerDto.reftypeparametre,
    )
        .then( async (res) => {
          console.log('=====================--------------------->>>>>>>>>>>>>>>>>>>>>>>>>>',res)
          return res;
        })
        .catch((err) => {
          throw new BadRequestException(err.message, { cause: err, description: err.query,});
        });
  }
}
