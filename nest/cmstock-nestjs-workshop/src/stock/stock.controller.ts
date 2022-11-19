import { CreateStockDto } from './dto/create-stock.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Put, } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock') // Controller manage service stock
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  // UsePipes เป็น hook ใช้ในการ tranform ข้อมูล
  // ValidationPipe ทำหน้าที่ verification การตรวสอบข้อมูลใน pipe
  @UsePipes(ValidationPipe) // ตรวจสอบข้อมูลที่ส่งเข้ามาในท่อส่งข้อมูลในที่นี้จะตรวจสอบข้อมูลโดย validate กับ dto
  create(@Body() createStockDto: CreateStockDto) {
    // @Body() createStockDto: CreateStockDto คือ รับข้อมูลที่ส่งเข้ามาจาก body ทั้งหมดจะต้องมี data ที่ตรงกับ rule dto ของ createStockDto ทั้งหมด
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll(): number[] {
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
