import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { UserEntity } from '../user/user.entity'

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  title: string

  @Column()
  about: string

  @Column({ default: true })
  available: boolean

  @ManyToOne(() => UserEntity, (user) => user.books, { onDelete: 'SET NULL' })
  user: UserEntity
}
