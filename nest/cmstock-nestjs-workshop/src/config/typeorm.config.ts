import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',        // type ที่จะใช้ orm connect กับ database ถ้าเป็น mysql จะชื่อว่า mysql
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'cmstock',
  autoLoadEntities: true,   // true เพื่อให้มัน auto load entity เพื่อให้พร้อมใช้งาน
  synchronize: true,        // sync ข้อมูลตลอดเวลา
};
