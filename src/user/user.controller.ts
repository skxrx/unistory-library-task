import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common'
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

import { UserService } from './user.service'
import { CreateUserDto } from './dto/user.create.dto'
import { EditUserDto } from './dto/user.edit.dto'
import { SubscribeUserDto } from './dto/user.subscribe.dto'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @Post()
  async createUser(@Res() response, @Body() userDto: CreateUserDto) {
    try {
      return response
        .status(201)
        .send(await this.userService.createUser(userDto))
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  @ApiOperation({ summary: 'Edit user' })
  @Put(':username')
  @ApiParam({ name: 'username', required: true })
  async editUser(
    @Res() response,
    @Param('username') username,
    @Body() userDto: EditUserDto,
  ) {
    try {
      return response
        .status(200)
        .send(await this.userService.editUser(username, userDto))
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  @ApiOperation({ summary: 'Subscribe' })
  @Put('subscribe')
  async subscribeUser(@Res() response, @Body() userDto: SubscribeUserDto) {
    try {
      return response
        .status(200)
        .send(await this.userService.subscribeUser(userDto))
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':username')
  @ApiParam({ name: 'username', required: true })
  async deleteUser(@Res() response, @Param('username') username) {
    try {
      return response
        .status(200)
        .send(await this.userService.deleteUser(username))
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get('list')
  async listUser() {
    return await this.userService.listUser()
  }

  @ApiOperation({ summary: 'Get user subscription info' })
  @Get(':username')
  @ApiParam({ name: 'username', required: true })
  async userInfo(@Res() response, @Param('username') username: string) {
    try {
      return response
        .status(200)
        .send(await this.userService.userInfo(username))
    } catch (error) {
      return response.status(400).send(error)
    }
  }
}
