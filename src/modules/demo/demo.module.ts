import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

@Module({
  imports: [ConfigModule],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
