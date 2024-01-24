import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PassportJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_JWT_KEY'),
    });
  }

  async validate(payload: any) {
    return {
      lastname: payload.lastname,
      firstname: payload.firstname,
      email: payload.email,
      matricule: payload.sub,
      companiesusers: JSON.stringify(payload.companiesusers),
      refcompany: payload.refcompany,
    }
  }
}
