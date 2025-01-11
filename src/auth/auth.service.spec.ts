import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';  
import { User } from './entities/user.entity';  
import { Repository } from 'typeorm';  

const mockUserRepository = {
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: getRepositoryToken(User),  
          useValue: mockUserRepository,  
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User)); 
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const mockUser = { id: 1, username: 'john_doe', password: 'hashedPassword' };  
    mockUserRepository.findOneBy.mockResolvedValueOnce(null);  
    mockUserRepository.create.mockReturnValue(mockUser);  
    mockUserRepository.save.mockResolvedValueOnce(mockUser);  

    const result = await service.register('john_doe', 'password123'); 
    expect(result).toEqual({ id: 1, username: 'john_doe' });  
  });

  it('should login a user', async () => {
    const mockUser = { id: 1, username: 'john_doe', password: 'hashedPassword' };
    mockUserRepository.findOneBy.mockResolvedValueOnce(mockUser); 
    mockJwtService.sign.mockReturnValue('jwt_token');

    const result = await service.login(mockUser);  
    expect(result).toEqual({ access_token: 'jwt_token' });  
  });
});
