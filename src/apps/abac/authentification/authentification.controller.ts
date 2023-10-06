import { Body, Request, Controller, Post, UseGuards, Get } from "@nestjs/common";
import { AuthentificationService } from './authentification.service';
import { LoginDto } from './login.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller('auth')
export class AuthentificationController {
  constructor(private authService: AuthentificationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req) {
    return req.user;
  }
}
