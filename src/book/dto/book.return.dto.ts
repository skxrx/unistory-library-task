import { ApiProperty } from '@nestjs/swagger'

export class GetReturnDto {
  @ApiProperty()
  username: string

  @ApiProperty()
  title: string
}
