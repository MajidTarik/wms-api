import { Module } from '@nestjs/common';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { PassportLocalStrategy } from './passport-local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportJwtStrategy } from './passport-jwt.strategy';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.secret_jwt_key,
      signOptions: { expiresIn: '604800s' },
    }),
  ],
  controllers: [AuthentificationController],
  providers: [
    AuthentificationService,
    PassportLocalStrategy,
    PassportJwtStrategy,
  ],
  exports: [],
})
export class AuthentificationModule {
  constructor() {}
}
