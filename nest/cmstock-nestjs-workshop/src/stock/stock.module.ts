import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])], // TypeOrmModule.forFeature ใช้กับ module ที่เป็นของลูกกำหนด ProductEntity ว่าให้ใช้งานกับ Module stock.module
  controllers: [StockController],
  providers: [StockService, ProductRepository],
})
export class StockModule {}
