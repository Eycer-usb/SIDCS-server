import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.interface';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}


  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
        throw new UnauthorizedException( 'Wrong password' );
    }
    if (user && isMatch) {
        const { password, ...result } = user;
        return result;
    }
  }

  async signIn(user :  Users) {

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