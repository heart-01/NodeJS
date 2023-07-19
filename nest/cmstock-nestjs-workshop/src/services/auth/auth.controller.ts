import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentailDto } from './dto/user-credentai.dto';
import { UserResponseDto } from './dto/user-credentai-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUsername } from 'src/decorators/custom.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() userCredentailDto: UserCredentailDto,
  ): Promise<UserResponseDto> {
    return this.authenService.signUp(userCredentailDto);
  }

  @Post('/signin')
  signIn(@Body() userCredentailDto: UserCredentailDto) {
    return this.authenService.signIn(userCredentailDto);
  }

  @Post('/refreshToken')
  async refreshToken(@Req() req) {
    return this.authenService.validateToken(req.body.refreshToken);
  }

  @Get('/testJWT')
  @UseGuards(AuthGuard())
  test(@Req() req, @GetUsername() username) {
    console.log(req.user)
    return req.user.username // user.username ได้มาจากตอน validate token
    // return username // username ได้มาจาก decorator
  }
}
