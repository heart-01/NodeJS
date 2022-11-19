import { CreateStockDto } from './dto/create-stock.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Put, } from '@nestjs/common';
import { StockService } from './stock.service';
import { ChangeStringCasePipe } from '../pipes/change-string-case/change-string-case.pipe';
import { ProductEntity } from './entities/product.entity';

@Controller('stock') // Controller manage service stock
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  // UsePipes เป็น hook ใช้ในการ tranform ข้อมูล หรือ ใช้ในการ validate data ก่อนเข้า controller
  // ValidationPipe ทำหน้าที่ verification การตรวสอบข้อมูลใน pipe
  @UsePipes(ValidationPipe) // ตรวจสอบข้อมูลที่ส่งเข้ามาในท่อส่งข้อมูลในที่นี้จะตรวจสอบข้อมูลโดย validate กับ dto
  @UsePipes(new ChangeStringCasePipe()) // เรียกใช้ custom pipe ที่เขียนขึ้นมาและ จะถูกเรียกใช้งานก่อน ValidationPipe เสมอ
  create(@Body() createStockDto: CreateStockDto): object {  // @Body() createStockDto: CreateStockDto คือ รับข้อมูลที่ส่งเข้ามาจาก body ทั้งหมดจะต้องมี data ที่ตรงกับ rule dto ของ createStockDto ทั้งหมด
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll(): Promise<ProductEntity[]> {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    return this.stockService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() createStockDto: CreateStockDto,
  ): string {
    return this.stockService.update(id, createStockDto);
  }

  @Put(':id')
  updateStockAllById(
    @Param('id') id: number,
    @Body() createStockDto: CreateStockDto,
  ): string {
    return this.stockService.updateAll(id, createStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): string {
    return this.stockService.remove(id);
  }
}
