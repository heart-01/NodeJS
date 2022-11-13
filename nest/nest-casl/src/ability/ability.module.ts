import { AbilityFactory } from './ability.factory/ability.factory';
import { Module } from '@nestjs/common';

@Module({
  // register provider service ของ module
  providers: [AbilityFactory],
  exports: [AbilityFactory], // export เพื่อให้ module อื่น ๆ สามารถ import ไปใช้งานได้
})
export class AbilityModule {}
