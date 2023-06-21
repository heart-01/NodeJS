import { ProductEntity } from '../entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateStockDto } from './../dto/create-stock.dto';
import { Injectable } from '@nestjs/common';

// custom Repository เป็น class ที่ใช้แทน query ใน table
@Injectable() //กำหนดว่า class นี้สามารถแทรกลง class อื่น ๆ ได้ผ่าน DI ของ NestJS
export class ProductRepository extends Repository<ProductEntity> {  // บอกว่า Repository class นี้เป็นของ ProductEntity
  constructor(private dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager()); // ส่ง ProductEntity เข้าไปใน constructor class แม่ เพื่อบอกว่า class ProductRepository จะทำงานกับ ProductEntity โดยสามารถแยก custom function ที่มีนอกเหนือจาก find, insert, update, delete
  }

  async insertProduct( createProductDto: CreateStockDto, image: string): Promise<ProductEntity | undefined> {
    const { name, price, stock } = createProductDto;

    const product = new ProductEntity();
    product.name = name;
    product.price = +price;
    product.stock = +stock;
    product.image = image;
    await product.save();

    return product;
  }
}
