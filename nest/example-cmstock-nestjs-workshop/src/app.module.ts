import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './stock/stock.module';
import { typeOrmConfig } from "./config/typeorm.config";
import { MulterModule } from '@nestjs/platform-express/multer';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger.middleware';
import { loggerFn } from './logger.fn.middleware';

@Module({
  imports: [
    StockModule,
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    MulterModule.register({
      dest: '/upldoad',
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, loggerFn)
      .forRoutes('stock');
  }

}
