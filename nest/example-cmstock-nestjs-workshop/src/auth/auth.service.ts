import { User } from './user.entity';
import { UserCredentailDto } from './dto/user-credential.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(userCredentialDto: UserCredentailDto) {
    const { username, password } = userCredentialDto;
    const salt = bcrypt.genSaltSync();

    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException(
          'Error, because this username already exist!',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async verifyUserPassword(userCredentialDto: UserCredentailDto) {
    const { username, password } = userCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await user.verifyPassword(password))) {
      return user.username;
    } else {
      return 'invalid';
    }
  }

  async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  signUp(userCredentialDto: UserCredentailDto) {
    return this.createUser(userCredentialDto);
  }

  async signIn(userCredentialDto: UserCredentailDto) {
    const username = await this.verifyUserPassword(userCredentialDto);

    if (!username) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username };
    const token = await this.jwtService.sign(payload);
    return { token };
  }
}
