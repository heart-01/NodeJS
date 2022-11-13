import { Action, AbilityFactory, } from '../ability/ability.factory';
import { ForbiddenError } from '@casl/ability';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable() // ประกาศว่าเป็น DI service provider เพื่อสามารถนำไปฉีดเข้าใน controller
export class UserService {
  constructor(private abilityFactory: AbilityFactory) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    const user = new User(); // pull from DB
    user.id = id;
    user.organizationId = 6789;
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto, currentUser: User) {
    const ability = this.abilityFactory.defineAbility(currentUser); // เรียกใช้งาน method defineAbility จาก DI ของ AbilityFactory แล้วส่ง currentUser เข้าไปเพื่อตรวจสอบสิทธิ์

    const userToUpdate = this.findOne(+id); // ค้นหา user ที่ต้องการจะ update จะได้รับ return เป็น User Model
    ForbiddenError.from(ability).throwUnlessCan(Action.Update, userToUpdate);

    // update call DB
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
