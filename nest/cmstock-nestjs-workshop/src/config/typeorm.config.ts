import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres', // type ที่จะใช้ orm connect กับ database ถ้าเป็น mysql จะชื่อว่า mysql
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    autoLoadEntities: true, // true เพื่อให้มัน auto load entity เพื่อให้พร้อมใช้งาน
    synchronize: false, // sync ฐานข้อมูลข้อมูลโดยอัตโนมัติกับ entity ควรปิดเมื่อ up ขึ้น production เพราะ เมื่อถึงจุดที่ sync มันอาจล้างข้อมูลบางอย่าง
  };
};
