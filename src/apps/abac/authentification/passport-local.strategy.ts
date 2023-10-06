import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthentificationService } from './authentification.service';
import { LoginDto } from './login.dto';
import { Strategy } from 'passport-local';

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy){

  constructor(private authService: AuthentificationService) {
    super();
  }
  async validate(username: string, password: string): Promise<any> {
    const loginDto: LoginDto = { matricule: username, pwd: password };
    const user = await this.authService.validateUser(loginDto);
    if(!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
