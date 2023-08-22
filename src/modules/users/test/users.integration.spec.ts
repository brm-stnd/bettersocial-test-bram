import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { AppModule } from '../../../app.module';
import { AppService } from '../../../app.service';
import { closeMongoConnection } from '../../../../test/support/mongoose.config';
import {
  Users,
  UsersDocument,
  UsersSchema,
} from '../../../schemas/users.schema';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users.service';
import { getModelToken } from '@nestjs/mongoose';

jest.setTimeout(10000);

describe('UsersModule', () => {
  let service: UsersService;
  let app: INestApplication;
  let httpServer: any;
  let module: TestingModule;
  let configService: ConfigService;

  let mockUserModel: Model<UsersDocument>;

  const testUsername = {
    _id: new mongoose.Types.ObjectId(),
    username: 'userExist',
    password: 'password',
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        AppService,
        {
          provide: getModelToken(Users.name),
          useValue: Model,
        },
      ],
    }).compile();

    mockUserModel = module.get<Model<UsersDocument>>(getModelToken(Users.name));

    app = module.createNestApplication();

    configService = app.get(ConfigService);

    await app.init();

    service = module.get<UsersService>(UsersService);

    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    if (module) {
      await closeMongoConnection();
      await app.close();
    }
  });

  describe('check username', () => {
    it('should return success user accepted', async () => {
      jest.spyOn(mockUserModel, 'findOne').mockResolvedValue(null);

      const response = await request(httpServer)
        .post('/users/username/is-exist')
        .send({
          username: 'newUsers',
        });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(response.body);
    });

    it('should return failed username long not enough', async () => {
      const response = await request(httpServer)
        .post('/users/username/is-exist')
        .send({
          username: 'sss',
        });

      expect(response.status).toBe(400);
      expect(response.body.message[0]).toBe(
        'username must be longer than or equal to 6 characters',
      );
    });

    it(`should return failed username can't contain symbols`, async () => {
      const response = await request(httpServer)
        .post('/users/username/is-exist')
        .send({
          username: 'sss@@@@',
        });

      expect(response.status).toBe(400);
      expect(response.body.message[0]).toBe(
        'username must contain only letters and numbers',
      );
    });

    it('should return failed username has been taken', async () => {
      jest.spyOn(mockUserModel, 'findOne').mockResolvedValue(testUsername);

      const response = await request(httpServer)
        .post('/users/username/is-exist')
        .send({
          username: 'userExist',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        'Sorry, userExist has already been taken',
      );
    });
  });

  describe('register', () => {
    it('should return success user accepted', async () => {
      jest.spyOn(mockUserModel, 'findOne').mockResolvedValue(null);

      const response = await request(httpServer).post('/users/register').send({
        username: 'newUsers',
        password: '123qwe123QWE',
      });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(response.body);
    });

    it('should return failed username long not enough', async () => {
      const response = await request(httpServer).post('/users/register').send({
        username: 'sss',
        password: '123qwe123QWE',
      });

      expect(response.status).toBe(400);
      expect(response.body.message[0]).toBe(
        'username must be longer than or equal to 6 characters',
      );
    });

    it('should return failed password long not enough', async () => {
      const response = await request(httpServer).post('/users/register').send({
        username: 'newUsers2',
        password: '1234',
      });

      expect(response.status).toBe(400);
      expect(response.body.message[0]).toBe(
        'password must be longer than or equal to 6 characters',
      );
    });

    it(`should return failed username can't contain symbols`, async () => {
      const response = await request(httpServer).post('/users/register').send({
        username: 'sss@@@@',
        password: '123qwe123QWE',
      });

      expect(response.status).toBe(400);
      expect(response.body.message[0]).toBe(
        'username must contain only letters and numbers',
      );
    });

    it('should return failed username has been taken', async () => {
      jest.spyOn(mockUserModel, 'findOne').mockResolvedValue(testUsername);

      const response = await request(httpServer).post('/users/register').send({
        username: 'userExist',
        password: '123qwe123QWE',
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        'Sorry, userExist has already been taken',
      );
    });
  });
});
