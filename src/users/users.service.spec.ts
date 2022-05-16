import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: Model<UserDocument>;

  const userDTO = {
    email: 'test@gmail.com',
    password: 'test',
    userType: 'user',
  };
  // const mockUserModel = {
  //   new: jest.fn().mockImplementation((dto) => dto),
  //   save: jest
  //     .fn()
  //     .mockResolvedValue((user) =>
  //       Promise.resolve({ id: Date.now(), ...user }),
  //     ),
  // };

  beforeEach(async () => {
    function mockUserModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return {
          id: Date.now(),
          ...this.data,
        };
      };
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    // mockUserModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new record and return that', async () => {
    expect(await service.create(userDTO)).toEqual({
      id: expect.any(Number),
      ...userDTO,
      password: expect.any(String),
    });
  });
});
