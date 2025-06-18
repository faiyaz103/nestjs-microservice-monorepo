import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ClientProxy } from '@nestjs/microservices';

import { BOOKS_PATTERNS } from '@app/contracts/books/books.patterns';
import { BookDto as ClientBookDto } from '@app/contracts/books/book.dto';
import { UpdateBookDto as ClientUpdateBookDto } from '@app/contracts/books/update-book.dto';
import { CreateBookDto as ClientCreateBookDto } from '@app/contracts/books/create-book.dto';
import { BookDto } from './dto/book.dto';
import { map } from 'rxjs';
import { BOOKS_CLIENT } from './constant';



@Injectable()
export class BooksService {

    constructor(@Inject(BOOKS_CLIENT) private booksClient:ClientProxy){};

    // map response model to gateway model
    private mapBookDto(bookDto: ClientBookDto): BookDto{
        return{
            id: bookDto.id,
            title:bookDto.title
        }
    }

  create(createBookDto: CreateBookDto) {
    return this.booksClient.send<ClientBookDto,ClientCreateBookDto>(
        BOOKS_PATTERNS.CREATE,
        createBookDto,
    ).pipe(map(this.mapBookDto)); // map response model to gateway model
  }

  findAll() {
    return this.booksClient.send<ClientBookDto>(BOOKS_PATTERNS.FIND_ALL,{});
  }

  findOne(id: number) {
    return this.booksClient.send<ClientBookDto>(BOOKS_PATTERNS.FIND_ONE,{id});
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksClient.send<ClientBookDto,ClientUpdateBookDto>(BOOKS_PATTERNS.UPDATE,{id, ...updateBookDto});
  }

  remove(id: number) {
    return this.booksClient.send<ClientBookDto>(BOOKS_PATTERNS.REMOVE,{id});
  }
}
