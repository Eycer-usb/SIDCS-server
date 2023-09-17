import { Body, Controller, HttpCode, Post, Get, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { dtoLogin } from './dto/login.dto';
import { dtoRegister } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Request() req : any) {
        return this.authService.signIn(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req : any) {
        return req.user;
    }

    @Post('register')
    register(@Body() body: dtoRegister) {
        return this.authService.register(body);
    }
}
