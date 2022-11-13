import { User } from '../user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, } from '@casl/ability';

// Step 1: action ที่จะ define rule casl
export enum Action {
  Manage = 'manage', // wildcard for any action
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

// Step 2: กำหนด subject interface เพื่อให้สิทธิ์ใน Casl กัับ User ส่วน all จะ define ว่าเป็น wildcard สำหรับการเข้าถึง subject ทั้งหมดในแอป
export type Subjects = InferSubjects<typeof User> | 'all';
/*
* ถ้าเราต้องการให้สิทธิ์มากกว่า 1 Subjects
* Subjects อธิบายก็คือ Entity ที่เราต้องการที่จะให้สิทธิ์การเข้าถึงใน api
export type Subjects = InferSubjects<typeof User | typeof Post> | 'all';
*/

// Step 3: รวม action กับ subject เข้าด้วยผ่าน Ability ของ casl อธิบายคือ เรากำลังสร้างความสามารถที่มี Action เหล่านี้ให้กับ Subjects เหล่านี้โดยเฉพาะ
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable() // ประกาศว่าเป็น DI service provider เพื่อสามารถนำไปฉีดเข้าใน controller
export class AbilityFactory {
  // method defineAbility เพื่อสามารถกำหนดสิทธิ์ของ user ที่รับเข้ามาซึ่งจะเป็นประเภทของ entities User
  defineAbility(user: User) {
    // Step 4: นำ Ability ที่กำหนดไว้ใน casl เข้ามาใช้งาน เพื่อ define สิทธิ์ให้กับ user ว่าสามารถทำอะไรได้
    const {
      can: allow,
      cannot: disallow,
      build,
    } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);

    // ถ้ามี user role admin เข้ามา
    if (user.role === 'admin') {
      allow(Action.Manage, 'all'); // ให้สิทธิ์สามารถ Action Manage กับ Subject all จะสามารถทำทุกอย่างในแอปได้

      // admin ไม่สามารถใช้ Manage ของ User ได้ถ้า organizationId ของ User ที่คุณกำลังจัดการนั้นไม่ตรงกับ organizationId กับ admin ที่กำลังจัดการ
      disallow(Action.Manage, User, { organizationId: { $ne: user.organizationId } }).because("You can only manage users in your own organization");
    }

    if (user.role === 'user') {
      //   allow(Action.Read, 'all');

      allow(Action.Read, User);
      disallow([Action.Create, Action.Update], User).because('your special message: only admin!!!'); // กำหนดไม่สามารถใช้งานได้แล้วส่ง error ออกไป
    }

    // return สิ่งที่ defineAbility ทำไว้ทั้งหมดออกไปซึ่งก็คือ 
    return build({
        detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
