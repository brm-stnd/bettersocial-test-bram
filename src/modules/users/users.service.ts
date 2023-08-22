import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Users, UsersDocument } from '../../schemas/users.schema';
import { IUserResponse } from './interfaces/users.response';

import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Users.name) private UsersModel: Model<UsersDocument>,
  ) {}

  async checkUsername(username): Promise<IUserResponse> {
    const isExist = await this.UsersModel.findOne({
      username,
    });
    if (isExist) {
      throw new HttpException(
        `Sorry, ${username} has already been taken`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return { status: HttpStatus.OK, result: 'username accepted' };
  }

  async register(username, password, profileImage): Promise<IUserResponse> {
    const isExist = await this.UsersModel.findOne({
      username,
    });
    if (isExist) {
      throw new HttpException(
        `Sorry, ${username} has already been taken`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    this.UsersModel.create({
      username,
      password: hashPassword,
      profileImage,
    });

    return { status: HttpStatus.OK, result: 'registrations success accepted' };
  }
}
