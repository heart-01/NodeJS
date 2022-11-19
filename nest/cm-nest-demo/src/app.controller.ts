import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // @ จะเรียกว่า decorator เหมือนกับ annotation ของ .net core
  getHello1(): string {
    return this.appService.getHello();
  }

  @Get('hello2')
  getHello2(): string {
    return 'Hello2';
  }
}
