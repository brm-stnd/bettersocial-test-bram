import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  Next,
  UsePipes,
  ValidationPipe,
  UseGuards,
  SetMetadata,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiHeader } from '@nestjs/swagger';
import { headerToken } from '../../swagger/swagger-global';
import { WebLoginResponse } from './swagger/employees.response';
import { RegisterBodyDto, CheckUsernameBodyDto } from './dto/employee.dto';
import { UsersService } from './users.service';

@Controller({ path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/username/is-exist')
  @UsePipes(new ValidationPipe())
  async checkUsername(@Res() res, @Body() checkUsername: CheckUsernameBodyDto) {
    const { username } = checkUsername;
    try {
      const resp = await this.usersService.checkUsername(username);

      return res.status(resp.status || 200).json({
        status: resp.status,
        message: resp.result || resp,
      });
    } catch (e) {
      return res.status(e.status).json({
        status: e.status,
        message: e.response,
      });
    }
  }

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async register(@Res() res, @Body() webLoginDto: RegisterBodyDto) {
    const { username, password } = webLoginDto;
    try {
      const resp = await this.usersService.register(username, password);

      return res.status(resp.status || 200).json({
        status: resp.status,
        message: resp.result || resp,
      });
    } catch (e) {
      return res.status(e.status).json({
        status: e.status,
        message: e.response,
      });
    }
  }
}
