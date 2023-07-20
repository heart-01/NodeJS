import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './services/stock/stock.module';
import { AuthModule } from './services/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { loggerFunctionMiddleware } from './middlewares/logger.fn.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // config env file
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
      isGlobal: true,
    }),
    /* แบบไม่ได้ DI class เข้าไป
    TypeOrmModule.forRoot(typeOrmConfig)
    */
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule], // เป็นการระบุการนำเข้าโมดูล ConfigModule เพื่อให้ NestJS รู้ว่าเราต้องการใช้งาน ConfigService ในการสร้างตัวกำหนดค่าของ TypeOrmModule // ไม่ต้องกำหนดเพราะ isGlobal: true,
      useFactory: ( // useFactory เป็นตัวเลือกหนึ่งในการกำหนดค่าให้กับโมดูลใน Nest.js ผ่านการใช้งานแบบ asynchronous factory function (ฟังก์ชันก่อนหน้าใช้งานแบบไม่ซิงโครไนซ์) ในที่นี้เราใช้ useFactory จะได้สามารถใช้ DI ในการส่ง class เข้าไปได้เพื่อใช้ตัวแปร env
        configService: ConfigService,
      ) => {
        return typeOrmConfig(configService);
      },
      inject: [ConfigService], // ใช้ inject เพื่อระบุว่าต้องใช้ ConfigService ใน useFactory และสร้าง TypeOrmModule
    }),
    AuthModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, loggerFunctionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
