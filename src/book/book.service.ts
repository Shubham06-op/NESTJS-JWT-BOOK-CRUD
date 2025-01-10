import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create(createBookDto); 
    return this.bookRepository.save(newBook); 
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find(); 
  }

  async findOne(id: string): Promise<Book> {
    return this.bookRepository.findOne({ where: { id: +id } }); 
  }

  async update(id: string, createBookDto: CreateBookDto): Promise<Book | null> {
    const book = await this.bookRepository.findOne({ where: { id: +id } });
    if (!book) return null;

    Object.assign(book, createBookDto); 
    return this.bookRepository.save(book); 
  }

  async remove(id: string): Promise<Book | null> {
    const book = await this.bookRepository.findOne({ where: { id: +id } });
    if (!book) return null;

    await this.bookRepository.remove(book); 
    return book;
  }
}
