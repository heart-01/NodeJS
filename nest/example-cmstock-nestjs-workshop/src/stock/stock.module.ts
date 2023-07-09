import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
