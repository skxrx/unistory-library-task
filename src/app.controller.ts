import { Controller, Get, Redirect } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'

@ApiTags('Docs')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'API Docs' })
  @Get()
  @Redirect('/api', 301)
  api() {
    return true
  }
}
