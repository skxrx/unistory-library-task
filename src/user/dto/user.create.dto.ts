import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty()
  username: string

  @ApiProperty()
  age: number

  @ApiProperty()
  sex: string
}
