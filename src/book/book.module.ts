import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BookEntity } from './book.entity'
import { BookService } from './book.service'
import { BookController } from './book.controller'
import { UserEntity } from '../user/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}
