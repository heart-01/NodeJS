import { AbilityModule } from './../ability/ability.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [AbilityModule], // import module ของ ability module หมายความว่าทุกอย่างใน module user จะสามารถนำ ablity.factory ไปใช้งานได้
  controllers: [UserController], // register class controller
  providers: [UserService], // register provider service ของ module user เพื่อทำ DI
})
export class UserModule {}
