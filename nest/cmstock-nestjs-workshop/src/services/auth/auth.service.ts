import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCredentailDto } from './dto/user-credentai.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-credentai-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(
    userCredentialDto: UserCredentailDto,
  ): Promise<UserResponseDto> {
    const { username, password } = userCredentialDto;
    const salt = bcrypt.genSaltSync();

    const user = new UserEntity();
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

    return new UserResponseDto(user);
  }

  async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  async verifyUserPassword(userCredentialDto: UserCredentailDto) {
    const { username, password } = userCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await user.verifyPassword(password))) {
      return new UserResponseDto(user);
    }
    return;
  }

  signUp(userCredentialDto: UserCredentailDto): Promise<UserResponseDto> {
    return this.createUser(userCredentialDto);
  }

  async signIn(userCredentialDto: UserCredentailDto) {
    const user = await this.verifyUserPassword(userCredentialDto);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username: user.username };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d', // หมดอายุใน 7 วัน
    });

    return { username: user.username, token: accessToken, refreshToken };
  }

  async validateToken(refreshToken: string) {
    try {
      const payloadRefreshToken = this.jwtService.verify(refreshToken);
      const payloadAccessToken = { username: payloadRefreshToken.username };
      const accessToken = this.jwtService.sign(payloadAccessToken, {
        expiresIn: '1h',
      });
      return { username: payloadAccessToken.username, token: accessToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
