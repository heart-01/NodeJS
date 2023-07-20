import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // บอกว่าจะแนบ jwt token มาทาง header bearer
      ignoreExpiration: false,
      // secretOrKey: jwtSecretKey, // key ที่ใช้ตรวจ token ต้องตรงกับตอน sign jwt ใช้งานแบบ hard code
      secretOrKeyProvider: (request: any, rawJwtToken: any, done: (arg0: null, arg1: string) => void) => { // key ที่ใช้ตรวจ token ต้องตรงกับตอน sign jwt แต่ใช้งานแบบดึงจากไฟล์ env
        const jwtSecretKey = this.configService.get<string>('JWT_SECRETKEY');
        done(null, jwtSecretKey);
      },
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
