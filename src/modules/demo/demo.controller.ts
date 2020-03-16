import { Controller, Get, HttpException } from '@nestjs/common';
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

  @Get('/config')
  @ApiOperation({
    summary: 'get config',
    operationId: 'getConfig',
  })
  getConfig(): Object {
    return this.demoService.getConfig();
  }

  @Get('/error')
  @ApiOperation({
    summary: 'get error',
    operationId: 'getError',
  })
  getError(): Object {
    throw new HttpException('test error', 400);
  }
}
