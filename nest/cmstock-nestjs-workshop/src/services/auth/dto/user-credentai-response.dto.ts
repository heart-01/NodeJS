// เขียน Class ให้ return property ได้หลายแบบ

import { UserEntity } from "../entities/user.entity";

// export class UserDto {
//   constructor(public username: string) {}
// }

// export class UserDto {
//   username: string;

//   constructor(username: string) {
//     this.username = username;
//   }
// }

export class UserResponseDto {
  username: string;

  constructor(user: UserEntity) {
    this.username = user.username;
    // สามารถเพิ่ม properties อื่นๆ จาก UserEntity ตามต้องการได้
  }
}
