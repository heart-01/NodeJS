import { ApiTags } from '@nestjs/swagger';
import { CreateStockDto } from './dto/create-stock.dto';
import {
  Req,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { ChangeStringCasePipe } from '../pipes/change-string-case/change-string-case.pipe';
import { ProductEntity } from './entities/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@ApiTags('stock')
@Controller('stock') // Controller manage service stock
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions)) // UseInterceptors จะเป็น middleware แล้วสามารถส่ง true หรือ fase เพื่อไปต่อ ส่วน FileInterceptor อนุญาติให้ส่งไฟล์เข้ามาที่ route ได้ โดยส่งชื่อ field ว่า file
  // UsePipes เป็น hook ใช้ในการ tranform ข้อมูล หรือ ใช้ในการ validate data ก่อนเข้า controller
  // ValidationPipe ทำหน้าที่ validate data DTO
  // @UsePipes(ValidationPipe) // ตรวจสอบข้อมูลที่ส่งเข้ามาในท่อส่งข้อมูลในที่นี้จะตรวจสอบข้อมูลโดย validate กับ dto
  @UsePipes(new ChangeStringCasePipe()) // เรียกใช้ custom pipe ที่เขียนขึ้นมาและ pipe ที่ cutiom จะถูกเรียกใช้งานก่อน ValidationPipe เสมอ
  async create(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createStockDto: CreateStockDto, // @Body() createStockDto: CreateStockDto คือ รับข้อมูลที่ส่งเข้ามาจาก body ทั้งหมดจะต้องมี data ที่ตรงกับ rule dto ของ createStockDto ทั้งหมด
  ): Promise<object> {
    return this.stockService.create(createStockDto, file);
  }

  @Get()
  findAll(): Promise<ProductEntity[]> {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number): string {
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
