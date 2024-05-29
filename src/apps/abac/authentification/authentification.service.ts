import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hash } from 'typeorm/util/StringUtils';
import { LoginDto } from './login.dto';
import { UserEntity } from '../../../entities/arazan-db/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthentificationService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(loginDts: LoginDto) {
    const user = await this.userService.findOneToLogIn(
        loginDts.matricule,
        loginDts.reforganisation,
    ); // Get the user object by matricule.
    // verify if the hash of the given pwd is equal to the hash stored in db.
    if (!user) {
      return null;
    }
    if (user?.pwd !== hash(loginDts.pwd)) {
      return null;
    }
    const { pwd, ...userRended } = user; // use the destructuring operator to eliminate returning the hash of the user password.
    return userRended;
  }

  async login(user: UserEntity) {
    const payload = {
      lastname: user.lastname,
      firstname: user.firstname,
      login: user.login,
      email: user.email,
      matricule: user.matricule,
      reforganisation: user.reforganisation,
      organisation: user.organisation.reforganisation,
      companiesusers: JSON.stringify(user.companiesusers),
    };
    return {
      access_tocken: this.jwtService.sign(payload),
    };
  }
}
