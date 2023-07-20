import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthJwtStrategy } from './auth.jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      // imports: [ConfigModule], // ไม่ต้อง imports เพราะ กำหนด ConfigModule isGlobal: true
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRETKEY'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService] // ใช้ inject เพื่อระบุว่าต้องใช้ ConfigService ใน useFactory และสร้าง JwtModule
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthJwtStrategy],
  exports: [AuthJwtStrategy, PassportModule], // ต้อง exports ออกไปเพราะต้องเอาใช้ใน Guard
})
export class AuthModule {}
