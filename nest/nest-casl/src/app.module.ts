import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AbilityModule } from './ability/ability.module';
import { APP_GUARD } from '@nestjs/core';
import { AbilitiesGuard } from './ability/ability.guard';

@Module({
  imports: [UserModule, AbilityModule],
  controllers: [AppController],
  providers: [AppService,{
    // ทำ global guard เพื่อไม่ต้องใช้ UseGuards ซ้ำ ๆ กัน
    provide: APP_GUARD,
    useClass: AbilitiesGuard // AbilitiesGuard สร้าง guards middleware เพื่อ check abilities ว่ามีสิทธิ์ไหมก่อนที่จะเข้า controller method
  }],
})
export class AppModule {}
