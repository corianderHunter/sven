import { Controller, Get } from '@nestjs/common';
import { DemoService } from './demo.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('demo')
@ApiTags('Demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  @ApiOperation({
    summary: 'hello world get',
    operationId: 'getHello',
  })
  getHello(): string {
    return this.demoService.getHello();
  }
}
