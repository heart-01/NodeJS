import { CreateStockDto } from './dto/create-stock-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fsExtra from 'fs-extra';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  createProduct(createStockDto: CreateStockDto) {
    const { name, price, stock } = createStockDto;
    const product = new Product();
    product.name = name;
    product.stock = stock;
    product.price = price;
    return this.productRepository.save(product);
  }

  getProducts(keyword: string) {
    if (keyword) {
      const query = this.productRepository.createQueryBuilder('product');
      query.andWhere('product.name LIKE :keyword', { keyword: `%${keyword}%` });
      return query.getMany();
    } else {
      return this.productRepository.find();
    }
  }

  async getProductById(id: number) {
    const found = await this.productRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Product ${id} is not found!`);
    }

    return found;
  }

  async deleteProduct(id: number) {
    const found = await this.getProductById(id);
    const { image } = found;
    await fsExtra.remove(`upload/${image}`);
    return await this.productRepository.delete(id);
  }

  async updateProduct(id: number, createStockDto: CreateStockDto) {
    const product = await this.getProductById(id);
    const { name, price, stock } = createStockDto;
    product.name = name;
    product.stock = stock;
    product.price = price;
    await product.save();
    return product;
  }
}
