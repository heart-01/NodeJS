import { AuthGuard } from '@nestjs/passport';
import { LoggerInterceptor } from './../logger.interceptor';
import { StockService } from './stock.service';

import { ChangeStringCasePipe } from './../pipes/change-string-case.pipe';
import { CreateStockDto } from './dto/create-stock-dto';
import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fsExtra from 'fs-extra';
import { extname } from 'path';

@Controller('stock')
@UseInterceptors(LoggerInterceptor)
// @UseGuards(MyGuard)
@UseGuards(AuthGuard())
export class StockController {
  constructor(private stockService: StockService) {}

  @Get()
  getStocks(@Query('keyword') keyword: string) {
    return this.stockService.getProducts(keyword);
  }

  // @Post()
  // addStock(@Body('name') name:string, @Body('price') price:number){

  //     console.log(`${name}, ${price}`)
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // @UsePipes(new ChangeStringCasePipe())
  // addStock(@Body() createStockDto: CreateStockDto) {
  //     return this.stockService.createProduct(createStockDto)
  // }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )

  // @UseInterceptors(FileInterceptor('file'))
  @UsePipes(ValidationPipe)
  @UsePipes(new ChangeStringCasePipe())
  async addStock(@UploadedFile() file, @Body() createStockDto: CreateStockDto) {
    const product = await this.stockService.createProduct(createStockDto);

    const imageFile = product.id + extname(file.filename);
    fsExtra.move(file.path, `upload/${imageFile}`);
    product.image = imageFile;
    await product.save();

    return product;
  }

  @Get('/:id')
  getStockById(@Param('id') id: number) {
    return this.stockService.getProductById(id);
  }

  @Delete('/:id')
  deleteStockById(@Param('id') id: number) {
    return this.stockService.deleteProduct(id);
  }

  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateStockById(
    @UploadedFile() file,
    @Param('id') id: number,
    @Body() createStockDto: CreateStockDto,
  ) {
    const product = await this.stockService.updateProduct(id, createStockDto);

    if (file) {
      fsExtra.remove(`upload/${product.image}`);
      const imageFile = id + extname(file.filename);
      fsExtra.move(file.path, `upload/${imageFile}`);
      product.image = imageFile;
      await product.save();
    }

    return product;
  }
}
