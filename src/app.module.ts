import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DemoModule } from './modules/demo/demo.module';

@Module({
  imports: [ConfigModule, DemoModule],
})
export class AppModule {}
