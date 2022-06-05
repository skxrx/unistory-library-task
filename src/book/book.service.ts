import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateBookDto } from './dto/book.create.dto'
import { GetReturnDto } from './dto/book.return.dto'
import { UserEntity } from '../user/user.entity'
import { BookEntity } from './book.entity'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async bookCreate(dto: CreateBookDto) {
    const { title, about } = dto
    let book: BookEntity = await this.bookRepository.findOne({
      where: { title: title },
    })

    if (book != null) {
      throw 'Book already exists'
    } else {
      book = new BookEntity()
      book.title = title
      book.about = about
      await this.bookRepository.save(book)
      return book
    }
  }
  async bookGetToUser(dto: GetReturnDto) {
    const { username, title } = dto
    const book: BookEntity = await this.bookRepository.findOne({
      where: { title: title },
    })
    const user: UserEntity = await this.userRepository.findOne({
      where: { username: username },
      relations: ['books'],
    })
    if (book == null) {
      throw 'Book with this name does not exist'
    } else if (user == null) {
      throw 'User with this name does not exist'
    } else if (!book.available) {
      throw 'Book is not available now'
    } else if (user.books_taken >= 5) {
      throw 'This user already have 5 books'
    } else if (!user.subscription) {
      throw 'This user is not subscribed'
    } else {
      user.books.push(book)
      user.books_taken++
      book.available = false
      await this.userRepository.save(user)
      await this.bookRepository.save(book)
      return `Book ${title} given for ${username}`
    }
  }
  async returnBook(dto) {
    const { username, title } = dto
    const book: BookEntity = await this.bookRepository.findOne({
      where: { title: title },
    })
    const user: UserEntity = await this.userRepository.findOne({
      where: { username: username },
      relations: ['books'],
    })
    if (book == null) {
      throw 'Book not found'
    } else if (user == null) {
      throw 'User not found'
    } else if (!user.books.find((element) => element.title == book.title)) {
      throw 'User have not got this book'
    } else {
      user.books.splice(user.books.indexOf(book))
      user.books_taken--
      book.available = true
      await this.userRepository.save(user)
      await this.bookRepository.save(book)
      return `User ${username} return ${title}`
    }
  }
}
