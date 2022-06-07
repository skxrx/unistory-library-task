import { ApiProperty } from '@nestjs/swagger'

export class SubscribeUserDto {
  @ApiProperty()
  username: string

  @ApiProperty()
  subscribe: boolean
}
