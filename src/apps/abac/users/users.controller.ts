import { Body, Controller, Get, HttpException, Param, Post } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { SetDefaultCompanyDto } from "./set-default-company.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }
  @Post('creatuser')
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.creat(createUserDto);
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.response.error,
        },
        e.status,
        {
          cause: e,
        },
      );
    }
  }
  @Get('findonebymatricule/:matricule')
  findOne(@Param() matricule) {
    try {
      return this.userService.findOneByMatricule(matricule);
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.response.error,
        },
        e.status,
        {
          cause: e,
        },
      );
    }
  }

  @Post('setdefaultcompany')
  setdefaultcompany(@Body() defaultcompany: SetDefaultCompanyDto) {
    try {
      return this.userService.setDefaultcompany(defaultcompany);
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.response.error,
        },
        e.status,
        {
          cause: e,
        },
      );
    }
  }
}
