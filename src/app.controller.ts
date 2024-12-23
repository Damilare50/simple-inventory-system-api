import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('')
export class AppController {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'welcome message' })
  getHello(): string {
    return 'Welcome to Simple API!';
  }
}
