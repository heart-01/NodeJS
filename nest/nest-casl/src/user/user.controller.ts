import { AbilitiesGuard } from './../ability/ability.guard';
import { ForbiddenError } from '@casl/ability';
import { User } from './entities/user.entity';
import { AbilityFactory, Action, } from '../ability/ability.factory';
import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, UseGuards, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReadUserAbility, CheckAbilities } from './../ability/ability.decorator';

@Controller('users')
export class UserController {
  /* 
    รับ DI ที่ถูกฉีดเข้ามาจาก UserService แล้วตั้งชื่อว่า userService 
    readonly สามารถเรียกใช้ได้อย่างเดียวไม่สามารถแก้ไขได้
    private ใช้ได้จากแค่ภายใน class นี้ไม่สามารถใช้ได้จาก class ภายนอก
  */
  constructor(
    private readonly userService: UserService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // * เช็ค ability casl จาก controller

    // const user = { id: 1, role: 'admin', organizationId: 12345 }; // mock data user ขึ้นมาว่าผ่านการ authenticate แล้ว ปกติแล้วเราจะใช้ passport เพื่อใช้ในการ authenticate แล้วข้อมูล user จะอยู่ใน req.user;
    const user = { id: 1, role: 'user', organizationId: 12345 };

    // กำหนดว่า admin เท่านั้นที่สามารถสร้าง User ได้
    const ability = this.abilityFactory.defineAbility(user); // เรียกใช้งาน method defineAbility จาก DI ของ AbilityFactory แล้วส่ง user เข้าไปเพื่อตรวจสอบสิทธิ์

    // * เช็คสิทธิ์แบบเขียนเอง
    // const isAllowed = ability.can(Action.Create, User); // ability จะได้สิทธิ์ของผู้ใช้มา แล้วมาเปรียบเทียบ can(Action.Create, User) กับ ability ที่ได้กำหนดเอาไว้จะ return เป็น true หรือ false
    // if (!isAllowed) {
    //   throw new ForbiddenException('only admin!!');
    // }
    // return this.userService.create(createUserDto);

    // * เช็คสิทธิ์แบบใช้ exception ของ casl
    try {
      // วิธีใช้ ForbiddenError โดยส่ง ability เข้าไปเช็คกับ throwUnlessCan จะโยน exception โดยอัตโนมัติเมื่อเปรียบเทียบแล้วไม่มีสิทธิ์
      ForbiddenError.from(ability).throwUnlessCan(Action.Create, User);

      return this.userService.create(createUserDto);
    } catch (error) {
      // ควรทำ class เพื่อ handle error http
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message); // กำหนด message error ไว้ใน because ของ casl
      }
    }
  }

  @Get()
  @CheckAbilities(new ReadUserAbility()) // เปลี่ยนไปใช้แบบเรียกใช้งาน object แทน ก่อนหน้าใช้ @CheckAbilities({ action: Action.Read, subject: User })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @CheckAbilities(new ReadUserAbility())
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // * ย้ายการเช็ค ability casl จาก controller มาอยู่ใน this.userService.update

    // const user = { id: 1, role: 'user', organizationId: 6789 };
    const user = { id: 1, role: 'admin', organizationId: 12345 };
    // const user = { id: 1, role: 'admin', organizationId: 6789 };

    try {
      return this.userService.update(+id, updateUserDto, user);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Delete(':id')
  // * ย้ายการเช็ค ability casl จาก controller ไปเป็น SetMetadata
  // * ย้ายไปทำ Global Guard ในไฟล์ app.module.ts // @UseGuards(AbilitiesGuard) // สร้าง guards middleware เพื่อ check abilities ว่ามีสิทธิ์ไหมก่อนที่จะเข้า controller method remove
  @CheckAbilities({ action: Action.Delete, subject: User }) // เรียกใช้ metadata เพื่อกำหนด rule ก่อนแล้ว UseGuards จะมี logic ดึง rule ส่วนนี้ไปเช็ค
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
