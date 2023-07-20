import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  // initialize swagger: http://localhost:3000/api
  const config = new DocumentBuilder()
    .setTitle('Workshop API')
    .setDescription('Workshop API')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ValidationPipe เพื่อตรวจสอบและกำหนดกฏการตรวจสอบข้อมูลเข้าสู่แอปพลิเคชันของคุณในรูปแบบที่เป็นมาตรฐาน
  // whitelist: true: การตั้งค่าค่านี้จะทำให้ ValidationPipe กรองและอนุญาตเฉพาะข้อมูลที่ถูกต้องเท่านั้นให้ผ่านไปยังระบบของแอปพลิเคชัน โดยจะตัดสิ่งที่ไม่ได้ระบุไว้ในโครงสร้างข้อมูลที่กำหนดไว้ในสกุลเงิน (เช่น JSON schema) ซึ่งจะช่วยในการป้องกันการส่งข้อมูลที่ไม่ถูกต้องหรือไม่ได้รับการต้องการเข้าสู่ระบบของคุณ
  // forbidNonWhitelisted: true: ค่านี้จะตรวจสอบและปฏิเสธข้อมูลที่ไม่ได้ระบุไว้ในโครงสร้างข้อมูลที่กำหนดไว้ในสกุลเงิน กล่าวคือหากมีข้อมูลที่ไม่ได้ระบุไว้ในโครงสร้างข้อมูล หรือไม่ถูกต้องตามเงื่อนไขที่กำหนด แอปพลิเคชันของคุณจะปฏิเสธและไม่รับข้อมูลดังกล่าว
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors(); // Open CORS
  app.use(express.json({ limit: '10mb' })); // การใช้ middleware ของ Express.js เพื่อรับข้อมูลที่ถูกส่งมาในรูปแบบ JSON และกำหนดขีดจำกัดความจุไฟล์ที่สามารถรับได้เป็น 10 เมกะไบต์ (10mb) เมื่อมีการส่งข้อมูล JSON เข้ามาทาง HTTP request body โดยส่วนนี้ใช้เพื่อป้องกันการรับข้อมูลที่มีขนาดใหญ่เกินกำหนดที่กำหนดไว้

  await app.listen(port);
}
bootstrap();
