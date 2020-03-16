import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DemoService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getConfig(): object {
    const test = this.configService.get('SWAGGER_DOC');
    console.log(test);
    return { test: 'Hello World!' };
  }
}
