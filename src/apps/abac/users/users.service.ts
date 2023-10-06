import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../entities/arazan-db/users/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { hash } from 'typeorm/util/StringUtils';
import { FindUserDto } from './find-user.dto';
import { firstValueFrom } from "rxjs";
import { SetDefaultCompanyDto } from "./set-default-company.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  creat(creatUserDto: CreateUserDto) {
    if (creatUserDto.pwd === creatUserDto.pwdConfirmation) { // testing that the pwd and pwd confirmation is the same
      const user = this.userRepository.create(creatUserDto); // transform the DTO to the entity user
      user.pwd = hash(user.pwd); // hash the pwd.
      return this.userRepository
        .save(user)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw new BadRequestException('erreur de BD Tarik.1', { cause: err, description: 'erreur de BD Tarik 2', });
        });
    } else {
      throw new BadRequestException('Mot de passe de confirmation est invalidation', { cause: null, description: 'Mot de passe de confirmation est invalidation', });
    }
  }

  async findOneByMatricule(matricule) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.companiesusers', 'usercompany')
      .where('user.matricule = :matricule', { matricule: matricule.matricule })
      .getOne()
      .then((res) => {
        return res;
      });
    // const user = await this.userRepository.findOneBy({ matricule: matricule.matricule })
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable.', { cause: null, description: 'Utilisateur introuvable.', });
    }
    return user;
  }

  async setDefaultcompany(setDefaultcompany: SetDefaultCompanyDto) {
    await this.userRepository
      .findOneBy({ id: setDefaultcompany.idUser })
      .then(async (user) => {
        if (user) {
          user.refcompany = setDefaultcompany.refcompany;
          return await this.userRepository
            .save(user)
            .then((updatedUser) => {
              return updatedUser;
            })
            .catch((err) => {
              throw new BadRequestException(err.message, { cause: err, description: err.query,});
            });
        } else {
          throw new BadRequestException('Utilisateur introuvable', { cause: null, description: 'Utilisateur introuvable',});
        }
      })
      .catch((err) => {
        throw new BadRequestException(err.message, { cause: err, description: err.query,});
      });


  }
}
