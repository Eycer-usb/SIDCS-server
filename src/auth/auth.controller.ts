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

    /**
     * Endpoint to login a user and return a JWT token to be used in the header 
     * of the requests to the API that require authentication 
     */
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Request() req : any) {
        return this.authService.signIn(req.user);
    }

    /**
     * Endpoint to verify the email of a user after registration
     */
    @HttpCode(HttpStatus.OK)
    @Get('verify-email/:jwt')
    verifyEmail(@Param('jwt') jwt: string) {
        return this.authService.verifyEmail(jwt);
    }

    /**
     * Endpoint to register a new user in the database and send an email
     * to verify the email address
     */
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() body: CreateUserDto) {
        return this.authService.register(body);
    }

    /**
     * Endpoint to send an email with a code to recover the password
     * of a user that has forgotten it 
     */
    @HttpCode(HttpStatus.OK)
    @Post('recover-password-code')
    recoverPassword(@Body() body: RecoveryCodeDto) {
        return this.authService.recoverPasswordCode(body.email);
    }

    /**
     * Endpoint to change the password of a user that has forgotten it
     * and has received a code to change it 
     */
    @HttpCode(HttpStatus.OK)
    @Post('recover-password')
    recoverPasswordCode(@Body() body: RecoveryDto) {
        return this.authService.recoverPassword(body);
    }

    /**
     * Endpoint to check if a user exists in the database
     */
    @HttpCode(HttpStatus.OK)
    @Post('user/exists')
    userExists(@Body() body: { email: string }) {
        return this.authService.userExists(body.email);
    }

    /**
     * Endpoint to refresh the JWT token of a user
     */
    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    @UseGuards(JwtAuthGuard)
    refreshToken(@Request() req: any) {
        return this.authService.refreshToken(req.user);
    }

}
