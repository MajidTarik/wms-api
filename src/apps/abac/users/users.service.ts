import {
    BadRequestException, Body,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from '../../../entities/arazan-db/users/user.entity';
import {Repository} from 'typeorm';
import {CreateUserDto} from './DTO/create-user.dto';
import {hash} from 'typeorm/util/StringUtils';
import {SetDefaultCompanyDto} from "./DTO/set-default-company.dto";
import {FindUserDto} from "./DTO/find-user.dto";
import {MasterdataService} from "../../administration/masterdata/masterdata.service";
import {UserCompanySaveDto} from "./DTO/user-company-save.dto";
import {UserCompanyFindDto} from "./DTO/user-company-find.dto";
import {UserCompaniesEntity} from "../../../entities/arazan-db/users/user-companies.entity";
import {DettachDefaultCompanyDto} from "./DTO/dettach-default-company.dto";
import {UserCompanyWarehouseFindDto} from "./DTO/user-company-warehouse-find.dto";
import {UserCompaniesWarehousesEntity} from "../../../entities/arazan-db/users/user-companies-warehouses.entity";
import {UserCompanyWarehouseSaveDto} from "./DTO/user-company-warehouse-save.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(UserCompaniesEntity)
        private readonly userCompaniesRepository: Repository<UserCompaniesEntity>,

        @InjectRepository(UserCompaniesWarehousesEntity)
        private readonly userCompaniesWarehousesRepository: Repository<UserCompaniesWarehousesEntity>,

        public masterdataService: MasterdataService,
    ) {
    }

    async creat(creatUserDto: CreateUserDto) {
        const user = this.userRepository.create(creatUserDto); // transform the DTO to the entity user

        if ([undefined, null, ''].includes(creatUserDto.matricule)) {
            user.matricule = await this.masterdataService.generatepk('US');
            user.pwd = hash('@@'+user.matricule+'@@'); // hash the pwd.
        }

        return this.userRepository
            .save(user)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException('erreur de BD Tarik.1', {
                    cause: err,
                    description: 'erreur de BD Tarik 2',
                });
            });
    }

    async findOneToLogIn(matricule, reforganisation) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.companiesusers', 'usercompany')
            .leftJoinAndSelect('user.organisation', 'organisation')
            .where('user.matricule = :matricule and user.reforganisation = :reforganisation and user.actif = true', {
                matricule: matricule,
                reforganisation: reforganisation
            })
            .getOne()
            .then((res) => {
                return res;
            });
        // const user = await this.userRepository.findOneBy({ matricule: matricule.matricule })
        if (!user) {
            throw new NotFoundException('Utilisateur introuvable.', {
                cause: null,
                description: 'Utilisateur introuvable.',
            });
        }
        return user;
    }

    async dettachDefaultcompany(dettachDefaultCompanyDto: DettachDefaultCompanyDto) {
        return await this.userCompaniesRepository
            .createQueryBuilder()
            .update(UserCompaniesEntity)
            .set({
                defaultrefcompany: false,
            })
            .where("reforganisation = :reforganisation and matricule = :matricule ", { reforganisation: dettachDefaultCompanyDto.reforganisation, matricule: dettachDefaultCompanyDto.matricule })
            .execute()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async getUsersList(userFindDto: FindUserDto) {
        return await this.userRepository
            .findBy({
                matricule: userFindDto?.matricule || undefined,
                reforganisation: userFindDto.reforganisation,
            })
            .then(async (users) => {
                return users;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async saveUserCompany(userAffectationDto: UserCompanySaveDto) {
        const usercomanyEntity = await this.getUsersCompanies({refcompany: userAffectationDto.refcompany, reforganisation: userAffectationDto.reforganisation, matricule: userAffectationDto.matricule})
        const usercompany = this.userCompaniesRepository.create(userAffectationDto); // transform the DTO to the entity user-company

        if (usercomanyEntity.length > 0) {
            if(usercompany.actif && usercompany.defaultrefcompany && usercompany.defaultrefcompany !== usercomanyEntity[0].defaultrefcompany) {
                await this.dettachDefaultcompany({matricule: userAffectationDto.matricule, reforganisation: userAffectationDto.reforganisation});
            }
        } else if (usercompany.actif && usercompany.defaultrefcompany) {
            await this.dettachDefaultcompany({matricule: userAffectationDto.matricule, reforganisation: userAffectationDto.reforganisation});
        }

        return this.userCompaniesRepository
            .save(usercompany)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException('erreur de BD Tarik.1', {
                    cause: err,
                    description: 'erreur de BD Tarik 2',
                });
            });
    }

    async getUsersCompanies(getUserAffectationDto: UserCompanyFindDto) {
        return await this.userCompaniesRepository
            .find({
                where: [{
                    matricule: getUserAffectationDto?.matricule || undefined,
                    refcompany: getUserAffectationDto?.refcompany || undefined,
                    reforganisation: getUserAffectationDto.reforganisation,
                }],
                relations: {company: true},
            })
            .then(async (userscompanies) => {
                return userscompanies;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async getUsersCompaniesWarehouses(userCompanyWarehouseFindDto: UserCompanyWarehouseFindDto) {
        return await this.userCompaniesWarehousesRepository
            .find({
                where: [{
                    matricule: userCompanyWarehouseFindDto.matricule,
                    refcompany: userCompanyWarehouseFindDto.refcompany,
                    reforganisation: userCompanyWarehouseFindDto.reforganisation,
                    refwarehouse: userCompanyWarehouseFindDto.refwarehouse,
                }],
                relations: {warehouse: true},
            })
            .then(async (userscompanies) => {
                return userscompanies;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, {cause: err, description: err.query,});
            });
    }

    async setDefaultcompany(setDefaultcompany: SetDefaultCompanyDto) {
        await this.dettachDefaultcompany({matricule: setDefaultcompany.matricule, reforganisation: setDefaultcompany.reforganisation})
        return await this.userCompaniesRepository
            .createQueryBuilder()
            .update(UserCompaniesEntity)
            .set({
                defaultrefcompany: true,
            })
            .where("reforganisation = :reforganisation and matricule = :matricule and refcompany = :refcompany", { reforganisation: setDefaultcompany.reforganisation, matricule: setDefaultcompany.matricule, refcompany: setDefaultcompany.refcompany })
            .execute()
            .then(async (res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
    }

    async saveUserCompanyWarehouse(userCompanyWarehouseSaveDto: UserCompanyWarehouseSaveDto) {
        const usercompanywarehouse = this.userCompaniesWarehousesRepository.create(userCompanyWarehouseSaveDto); // transform the DTO to the entity user-company

        return this.userCompaniesWarehousesRepository
            .save(usercompanywarehouse)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                throw new BadRequestException('erreur de BD Tarik.1', {
                    cause: err,
                    description: 'erreur de BD Tarik 2',
                });
            });
    }
}
