import { ForbiddenError } from '@casl/ability';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { currentUser } from '../user/current-user';
import { RequiredRule, CHECK_ABILITY } from './ability.decorator';
import { AbilityFactory } from './ability.factory';

// CanActivate เป็น interface ที่ function AbilitiesGuard ต้อง implements เพราะ จะต้องไปใช้ใน UseGuards function ไหนที่จะใส่ใน UseGuards จะต้อง implements CanActivate ด้วย
// CanActivate ค่าที่จะ return ออกไปต้องเป็น boolean หรือ async function
@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
  ) {}

  // canActivate จะส่งค่า boolean หากเป็น true จะไปยัง midleware ถัดไปแต่ถ้าเป็น false จะป้องกันไม่ให้ request ถัดไปทำงาน และ return 403 ออกไปให้ UseGuards ใช้งาน
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // reflector เพื่อดึง rules ดึงข้อมูล metadata ย้อนกลับมาดูก่อน คือ @CheckAbilities({ action: Action.Delete, subject: User }) จะได้เป็นค่า action กับ subject ที่เช็คไว้ใน metadata
    const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) || [];

    // const { user } = context.switchToHttp().getRequest(); // วิธีที่จะรับ user เมื่อมี database แล้ว ส่วนใหญ่ข้อมูล user จะอยู่ใน request.user
    const user = currentUser; // mockup data user เสมือนว่ามีการส่ง user เข้ามา
    const ability = this.caslAbilityFactory.defineAbility(user); // เรียกใช้งาน method defineAbility จาก DI ของ AbilityFactory แล้วส่ง user เข้าไปเพื่อตรวจสอบสิทธิ์

    try {
      // เช็ค rule ที่เข้ามาให้ตรงกับ casl
      rules.forEach((rule) =>
        // วิธีใช้ ForbiddenError โดยส่ง ability เข้าไปเช็คกับ throwUnlessCan จะโยน exception โดยอัตโนมัติเมื่อเปรียบเทียบแล้วไม่มีสิทธิ์
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
      );

      return true;
    } catch (error) {
      // ถ้าไม่มีสิทธิ์การเข้าถึงใน casl จะ return ForbiddenError 403
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message); // กำหนด message error ไว้ใน because ของ casl
      }
    }
  }
}
