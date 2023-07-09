import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', // type ที่จะใช้ orm connect กับ database ถ้าเป็น mysql จะชื่อว่า mysql
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'cmstock', // localhost
  autoLoadEntities: true, // true เพื่อให้มัน auto load entity เพื่อให้พร้อมใช้งาน
  synchronize: false, // sync ฐานข้อมูลข้อมูลโดยอัตโนมัติกับ entity ควรปิดเมื่อ up ขึ้น production เพราะ เมื่อถึงจุดที่ sync มันอาจล้างข้อมูลบางอย่าง
};