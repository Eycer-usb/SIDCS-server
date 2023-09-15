import { Body, Controller, HttpCode, Post, Get, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { dtoLogin } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() body: dtoLogin) {
        return this.authService.signIn(body.email, body.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req : any) {
        return req.user;
    }
}
