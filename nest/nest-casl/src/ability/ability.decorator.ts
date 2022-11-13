import { User } from './../user/entities/user.entity';
import { Action, Subjects } from './ability.factory';
import { SetMetadata } from '@nestjs/common';

// กำหนด interface สำหรับรับ rule casl เพื่อจะใช้เป็น type ของ requirements ใน function
export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

// สร้าง function เพื่อ check abilities ว่ามีสิทธิ์ไหม logic จะอยู่ในไฟล์ ability.guard.ts ส่วน SetMetadata จะเป็นการกำหนด metadata เพื่อให้สามารถ reference ผ่าน @CheckAbilities() ได้
export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);

// กำหนด class ในการอ่านข้อมูลของ User เพื่อใช้กำหนดใน CheckAbilities ของ User controller
export class ReadUserAbility implements RequiredRule {
  action = Action.Read;
  subject = User;
}
