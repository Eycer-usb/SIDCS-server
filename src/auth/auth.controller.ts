import { Body, Controller, HttpCode, Post, Get, HttpStatus, Request, UseGuards, Logger, Param, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RecoveryDto } from './RecoveryDto';
import { RecoveryCodeDto } from './RecoveryCodeDto';


@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Request() req : any) {
        return this.authService.signIn(req.user);
    }

    @HttpCode(HttpStatus.OK)
    @Get('verify-email/:jwt')
    verifyEmail(@Param('jwt') jwt: string) {
        return this.authService.verifyEmail(jwt);
    }


    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() body: CreateUserDto) {
        return this.authService.register(body);
    }

    @HttpCode(HttpStatus.OK)
    @Post('recover-password-code')
    recoverPassword(@Body() body: RecoveryCodeDto) {
        if (!body.email) {
            throw new BadRequestException("Email is required");
        }
        return this.authService.recoverPasswordCode(body.email);
    }

    @HttpCode(HttpStatus.OK)
    @Post('recover-password')
    recoverPasswordCode(@Body() body: RecoveryDto) {
        return this.authService.recoverPassword(body);
    }

}
