import { Body, Controller, Post, Put, Res } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { BookService } from './book.service'
import { CreateBookDto } from './dto/book.create.dto'
import { GetReturnDto } from './dto/book.return.dto'

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Add new book' })
  @Post()
  async addBook(@Res() response, @Body() bookDto: CreateBookDto) {
    try {
      return response
        .status(201)
        .send(await this.bookService.bookCreate(bookDto))
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  @ApiOperation({ summary: 'Give book for user' })
  @Put('get_book')
  async addBookToUser(@Res() response, @Body() bookDto: GetReturnDto) {
    try {
      return response
        .status(200)
        .send(await this.bookService.bookGetToUser(bookDto))
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  @ApiOperation({ summary: 'Return book' })
  @Put('return_book')
  async returnBook(@Res() response, @Body() bookDto: GetReturnDto) {
    try {
      return response
        .status(200)
        .send(await this.bookService.returnBook(bookDto))
    } catch (error) {
      return response.status(400).send(error)
    }
  }
}
