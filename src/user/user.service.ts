import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserDto } from './dto/user.create.dto'
import { EditUserDto } from './dto/user.edit.dto'
import { SubscribeUserDto } from './dto/user.subscribe.dto'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const { username, age, sex } = dto
    let user: UserEntity = await this.userRepository.findOne({
      where: {
        username: username,
      },
    })

    if (user != null) {
      throw 'User with same username already exists'
    } else {
      user = new UserEntity()
      user.username = username
      user.age = age
      user.sex = sex
      await this.userRepository.save(user)
      return user
    }
  }

  async editUser(username, dto: EditUserDto) {
    const { new_username, new_age, new_sex } = dto
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        username: username,
      },
    })
    if (user == null) {
      throw 'User with same username already exists'
    } else {
      user.username = new_username ? new_username : username
      user.age = new_age ? new_age : user.age
      user.sex = new_sex ? new_sex : user.sex
      await this.userRepository.save(user)
      return user
    }
  }

  async deleteUser(username) {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        username: username,
      },
    })
    if (user == null) {
      throw 'User not found'
    } else {
      await this.userRepository.delete(user)
      return user.username + ' deleted'
    }
  }

  async subscribeUser(dto: SubscribeUserDto) {
    const { username, subscribe } = dto
    const user: UserEntity = await this.userRepository.findOne({
      where: { username: username },
    })
    if (user == null) {
      throw 'User not found'
    } else {
      user.subscription = subscribe
      await this.userRepository.save(user)
      return user.username + ` is ${!subscribe ? 'not' : ''} subscribed`
    }
  }

  async listUser() {
    return await this.userRepository.find()
  }
  async userInfo(username: string) {
    const user = await this.userRepository.findOne({
      where: { username: username },
      relations: ['books'],
    })
    if (user == null) {
      throw 'User not found'
    } else {
      return user
    }
  }
}
