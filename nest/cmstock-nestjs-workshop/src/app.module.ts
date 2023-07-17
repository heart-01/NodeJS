import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './services/stock/stock.module';
import { AuthModule } from './services/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { loggerFunctionMiddleware } from './middlewares/logger.fn.middleware';

@Module({
  imports: [AuthModule, StockModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, loggerFunctionMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
