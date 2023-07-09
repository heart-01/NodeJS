import { User } from './user.entity';
import { UserCredentailDto } from './dto/user-credential.dto';
import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUsername } from './get-username.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authenService: AuthService) { }

    // {"username":"admin", "password":"12345678aA!"}
    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() userCredential: UserCredentailDto) {
        console.log(userCredential)
        return this.authenService.signUp(userCredential)
    }

    @Post('/signin')
    signIn(@Body() userCredential: UserCredentailDto) {
        console.log(userCredential)
        return this.authenService.signIn(userCredential)
    }


    @Get("/test")
    @UseGuards(AuthGuard())
    test(@Req() req, @GetUsername() username) {
        // console.log(req)
        // return req.user.username

        return username
    }

}
