import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class StockService {
  constructor(private productRepository: ProductRepository) {} // ฉีด ProductRepository เข้ามาใน class StockService

  async create(createStockDto: CreateStockDto): Promise<object> {
    const product = await this.productRepository.insertProduct(createStockDto);

    return {
      success: true,
      data: product ,
    };
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  findOne(id: number): string {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto): string {
    return `This action updates a #${id} stock`;
  }

  updateAll(id: number, updateStockDto: UpdateStockDto): string {
    return `This action updates a #${id} stock`;
  }

  remove(id: number): string {
    return `This action removes a #${id} stock`;
  }
}
