import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  create(createStockDto: CreateStockDto) {
    const { name, price, stock } = createStockDto;
    console.log(name, price, stock);
    return 'This action adds a new stock';
  }

  findAll(): number[] {
    return [1, 2, 3];
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
