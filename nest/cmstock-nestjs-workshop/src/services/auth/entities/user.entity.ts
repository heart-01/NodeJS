import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: '' })
  salt: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  async verifyPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, this.salt);
    return this.password === hashPassword;
  }
}
