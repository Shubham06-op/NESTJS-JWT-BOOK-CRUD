import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  

@Controller('book')
@UseGuards(JwtAuthGuard) 
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createBookDto: CreateBookDto) {
    return this.bookService.update(id, createBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
