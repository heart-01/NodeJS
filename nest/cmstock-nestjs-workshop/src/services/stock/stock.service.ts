import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fsExtra from 'fs-extra';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>, // ฉีด ProductRepository แบบปกติ เข้ามาใน class StockService
    private readonly productRepositoryCustom: ProductRepository, // ฉีด ProductRepository แบบ Custom เข้ามาใน class StockService
  ) {}

  async create(
    createStockDto: CreateStockDto,
    file: Express.Multer.File,
  ): Promise<object> {
    const product = await this.productRepositoryCustom.insertProduct(
      createStockDto,
      file?.filename,
    );

    return {
      success: true,
      data: product,
    };
  }

  async findAll(keyword: string): Promise<ProductEntity[]> {
    if (keyword) {
      const query = this.productRepositoryCustom.createQueryBuilder('product');
      query.andWhere('product.name LIKE :keyword', { keyword: `%${keyword}%` });
      return query.getMany();
    } else {
      return await this.productRepositoryCustom.find();
    }
  }

  async findOne(id: number): Promise<object> {
    const found = await this.productRepositoryCustom.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`Product ${id} not found`);
    return found;
  }

  async update(
    id: number,
    updateStockDto: UpdateStockDto,
    file: Express.Multer.File,
  ): Promise<object> {
    const product = await this.findOne(id);
    const { name, price, stock } = updateStockDto;

    const updatedProduct = product as ProductEntity; // กำหนดให้ product มี type ตาม class ProductEntity
    updatedProduct.name = name;
    updatedProduct.price = price;
    updatedProduct.stock = stock;

    if (file) {
      this.removeFile(id);
      updatedProduct.image = file?.filename;
    }

    return await this.productRepositoryCustom.save(product);
  }

  async updateAll(
    id: number,
    updateStockDto: UpdateStockDto,
    file: Express.Multer.File,
  ): Promise<object> {
    const product = await this.findOne(id);
    const { name, price, stock } = updateStockDto;

    const updatedProduct = product as ProductEntity; // กำหนดให้ product มี type ตาม class ProductEntity
    updatedProduct.name = name;
    updatedProduct.price = price;
    updatedProduct.stock = stock;

    if (file) {
      this.removeFile(id);
      updatedProduct.image = file?.filename;
    }

    return await this.productRepositoryCustom.save(product);
  }

  async remove(id: number): Promise<object> {
    this.removeFile(id);
    return await this.productRepositoryCustom.delete(id);
  }

  async removeFile(id: number) {
    const product = await this.findOne(id);
    const { image } = product as { image: string }; // กำหนด type โดยระบุ type ตาม key data product
    fsExtra.remove(`src/assets/img/${image}`);
  }
}
