import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
        throw new UnauthorizedException();
    }

    if (user.password !== password) {
        throw new UnauthorizedException( 'Wrong password' );
    }

    const payload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        role: user.role
    }
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

    async register(user: any) {
        return await this.usersService.create(user);
    }
}