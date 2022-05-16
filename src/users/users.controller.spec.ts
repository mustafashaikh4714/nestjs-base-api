import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const userDTO = {
    email: 'test@gmail.com',
    password: 'test',
    userType: 'user',
  };
  const mockUsersService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),

    findOne: jest.fn().mockImplementation((id) => {
      return {
        id,
        ...userDTO,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(controller.create(userDTO)).toEqual({
      id: expect.any(Number),
      ...userDTO,
    });
    expect(mockUsersService.create).toHaveBeenCalledWith(userDTO);
  });

  it('should find user by id', () => {
    let id = '1';
    expect(controller.findOne(id)).toEqual({ id, ...userDTO });
    expect(mockUsersService.findOne).toHaveBeenCalledWith(id);
  });
});
