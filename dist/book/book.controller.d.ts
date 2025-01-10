import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    create(createBookDto: CreateBookDto): Promise<import("./book.entity").Book>;
    findAll(): Promise<import("./book.entity").Book[]>;
    findOne(id: string): Promise<import("./book.entity").Book>;
    update(id: string, createBookDto: CreateBookDto): Promise<import("./book.entity").Book>;
    remove(id: string): Promise<import("./book.entity").Book>;
}
