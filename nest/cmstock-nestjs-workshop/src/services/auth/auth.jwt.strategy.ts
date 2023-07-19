import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // บอกว่าจะแนบ jwt token มาทาง header bearer
      secretOrKey: 'password', // key ที่ใช้ตรวจ token ต้องตรงกับตอน sign jwt
    });
  }

  async validate(payload: { username: string }) {
    const { username } = payload;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    // return user กลับไป เพื่อเวลา route ไหนที่เรียกใช้ AuthGuard มันจะยัด user ลงไปใน request route ให้เลย
    return { username: user.username };
  }
}
