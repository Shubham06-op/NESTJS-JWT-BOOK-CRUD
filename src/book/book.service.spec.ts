import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

describe('BookService', () => {
  let service: BookService;
  let repository: Repository<Book>;

  const mockBookRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const mockCreatedBook = {
      id: 1,
      title: 'Test Book',
      author: 'Author',
      genre: 'Fiction',
      yearPublished: 2020,
    };
    (repository.create as jest.Mock).mockReturnValue(mockCreatedBook);

    (repository.save as jest.Mock).mockResolvedValue(mockCreatedBook);

    const result = await service.create({
      title: 'Test Book',
      author: 'Author',
      genre: 'Fiction',
      yearPublished: 2020,
    });

    expect(result).toHaveProperty('id');
    expect(result.title).toBe('Test Book');

    expect(repository.create).toHaveBeenCalledWith({
      title: 'Test Book',
      author: 'Author',
      genre: 'Fiction',
      yearPublished: 2020,
    });

    expect(repository.save).toHaveBeenCalledWith(mockCreatedBook);
  });
});
