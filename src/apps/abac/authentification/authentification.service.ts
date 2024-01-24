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
    const user = await this.userService.findOneByMatricule({
      matricule: loginDts.matricule,
    }); // Get the user object by matricule.
    // verify if the hash of the given pwd is equal to the hash stored in db.
    if (user?.pwd !== hash(loginDts.pwd) || !user) {
      return null;
    }
    const { pwd, ...userRended } = user; // use the destructuring operator to eliminate returning the hash of the user password.
    return userRended;
  }

  async login(user: UserEntity) {
    const payload = {
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      sub: user.matricule,
      companiesusers: JSON.stringify(user.companiesusers),
      refcompany: user.refcompany,
    };
    return {
      access_tocken: this.jwtService.sign(payload),
      matricule: user.matricule,
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      companiesusers: JSON.stringify(user.companiesusers),
      refcompany: user.refcompany,
    };
  }
}
