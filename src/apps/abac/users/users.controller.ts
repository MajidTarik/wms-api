import { Body, Controller, Get, HttpException, Param, Post } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { SetDefaultCompanyDto } from "./DTO/set-default-company.dto";
import {FindUserDto} from "./DTO/find-user.dto";
import {UserCompanySaveDto} from "./DTO/user-company-save.dto";
import {UserCompanyFindDto} from "./DTO/user-company-find.dto";
import {UserCompanyWarehouseFindDto} from "./DTO/user-company-warehouse-find.dto";
import {UserCompanyWarehouseSaveDto} from "./DTO/user-company-warehouse-save.dto";

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

  @Get('findonebymatricule/:matricule:reforganisation')
  findOne(@Param() matricule, reforganisation) {
    try {
      return this.userService.findOneToLogIn(matricule, reforganisation);
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

  @Post('getuserslist')
  getUsersList(@Body() userfindDto: FindUserDto) {
    try {
      return this.userService.getUsersList(userfindDto);
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

  @Post('userscompaniesaffectation')
  saveUserCompany(@Body() userAffectationDto: UserCompanySaveDto) {
    try {
      return this.userService.saveUserCompany(userAffectationDto);
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

  @Post('getuserscompanies')
  getUsersCompanies(@Body() getUserAffectationDto: UserCompanyFindDto) {
    try {
      return this.userService.getUsersCompanies(getUserAffectationDto);
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

    @Post('getuserscompanieswarehouses')
    getUsersCompaniesWarehouses(@Body() userCompanyWarehouseFindDto: UserCompanyWarehouseFindDto) {
        try {
            return this.userService.getUsersCompaniesWarehouses(userCompanyWarehouseFindDto);
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

    @Post('saveusercompanywarehouse')
    saveUserCompanyWarehouse(@Body() userCompanyWarehouseSaveDto: UserCompanyWarehouseSaveDto) {
        try {
            return this.userService.saveUserCompanyWarehouse(userCompanyWarehouseSaveDto);
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
