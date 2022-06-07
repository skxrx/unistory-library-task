import { ApiProperty } from '@nestjs/swagger'

export class EditUserDto {
  @ApiProperty()
  new_username?: string

  @ApiProperty()
  new_age?: number

  @ApiProperty()
  new_sex?: string
}
