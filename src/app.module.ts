import { Module } from '@nestjs/common';
import { DemoModule } from './modules/demo/demo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV || ''}.env`,
      isGlobal: true,
    }),
    DemoModule,
  ],
})
export class AppModule {}
