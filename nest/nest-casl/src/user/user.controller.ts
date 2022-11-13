import { User } from './entities/user.entity';
import { AbilityFactory, Action } from '../ability/ability.factory/ability.factory';
import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    const user = { id: 1, role: 'user' }; // mock data user ขึ้นมาว่าผ่านการ authenticate แล้ว ปกติแล้วเราจะใช้ passport เพื่อใช้ในการ authenticate แล้วข้อมูล user จะอยู่ใน req.user;

    // กำหนดว่า admin เท่านั้นที่สามารถสร้าง User ได้
    const ability = this.abilityFactory.defineAbility(user); // เรียกใช้งาน method defineAbility จาก DI ของ AbilityFactory แล้วส่ง user เข้าไปเพื่อตรวจสอบสิทธิ์
    const isAllowed = ability.can(Action.Create, User); // ability จะได้สิทธิ์ของผู้ใช้มา แล้วมาเปรียบเทียบ can(Action.Create, User) กับ ability ที่ได้กำหนดเอาไว้จะ return เป็น true หรือ false

    if (!isAllowed) {
      throw new ForbiddenException('only admin!!');
    }

    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
