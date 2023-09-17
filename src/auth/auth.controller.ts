import { Body, Controller, HttpCode, Post, Get, HttpStatus, Request, UseGuards, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


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

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() body: CreateUserDto) {
        return this.authService.register(body);
    }
}
