import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.entity';
import { EmailService } from 'src/email/email.service';
import { RecoveryDto } from './RecoveryDto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}


  async validateUser(email: string, pass: string): Promise<Partial<User> | undefined> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isMatch = await bcrypt.compare(pass, user.password!);
    if (!isMatch) {
        throw new UnauthorizedException( 'Wrong password' );
    }
    if (user && isMatch) {
        delete user['password'];
        return user;
    }
  }

  async signIn(user: Partial<User>) {

    if (!user.email) {
      throw new NotFoundException("User not found");
    }

    const storagedUser = await this.usersService.findByEmail(user.email);
    if (!storagedUser) {
      throw new NotFoundException("User not found");
    }

    const payload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
        verified: user.verified,
    }

    if (!payload.verified) {
      
      this.generateVerificationEmail(payload.email);
      throw new UnauthorizedException( {
        statusCode: 401,
        status: "error",
        message: 'User not verified. Email sent to verify account'
      } );
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
      if (await this.usersService.create(createUserDto)) {
        await this.generateVerificationEmail(createUserDto.email);
        return {
          statusCode: 201,
          status: "success",
          message: 'User created successfully'
        }
      };
  }

  async generateVerificationEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    try {

      const payload = { email };
      const jwt = await this.jwtService.signAsync(payload);
      // TODO: Send email with verification code
      await this.emailService.validateEmail(user, jwt);

      return {
        statusCode: 200,
        status: "success",
        message: 'Verification email sent successfully'
      }        
    }
    catch (error) {
      Logger.log(error);
      throw new InternalServerErrorException( 'Error sending verification email' );
    }
  }

  async verifyEmail(jwt: string) {
    try{
      const payload = await this.jwtService.verifyAsync(jwt);
      return await this.usersService.verifyEmail(payload.email);
    } catch (error) {
      throw new InternalServerErrorException( 'Error on verification' );
    }
  }

  async recoverPasswordCode(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    try {
      this.usersService.generateVerificationCode(user);
      this.emailService.sendUserPasswordRecovery(user, user.verification_code!.toString());
      return {
        statusCode: 200,
        status: "success",
        message: 'Verification code sent successfully'
      }
    }
    catch (error) {
      throw new InternalServerErrorException( 'Error on verification code generation' );
    }
  }

  async recoverPassword(request: RecoveryDto) {
    const user = await this.usersService.findByEmail(request.email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (user.verification_code !== request.verification_code) {
      throw new UnauthorizedException( 'Wrong verification code' );
    }
    try {
      await this.usersService.recoverPassword(user, request.password);
      return {
        statusCode: 200,
        status: "success",
        message: 'Password recovered successfully'
      }
    }
    catch (error) {
      throw new InternalServerErrorException( 'Error on password recovery' );
    }
  }
}