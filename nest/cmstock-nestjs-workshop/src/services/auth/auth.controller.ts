import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentailDto } from './dto/user-credentai.dto';
import { UserResponseDto } from './dto/user-credentai-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenService: AuthService) {}

  @Post('/signup')
  signUp(@Body() userCredentailDto: UserCredentailDto): Promise<UserResponseDto> {
    return this.authenService.signUp(userCredentailDto);
  }

  @Post('/signin')
  signIn(@Body() userCredentailDto: UserCredentailDto) {
    return this.authenService.signIn(userCredentailDto);
  }
}
