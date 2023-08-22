import {
  Controller,
  Post,
  Body,
  Res,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
  async register(@Res() res, @Body() registerDto: RegisterBodyDto) {
    const { username, password, profileImage } = registerDto;
    try {
      const resp = await this.usersService.register(
        username,
        password,
        profileImage,
      );

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

  @Post('upload/profile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(
    @Res() res,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      return res.status(200).json({
        status: 200,
        message: file,
      });
    } catch (e) {
      return res.status(e.status).json({
        status: e.status,
        message: e.response,
      });
    }
  }
}
