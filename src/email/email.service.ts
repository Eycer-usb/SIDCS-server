import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/users.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUser2Fa(user: User, token: string) {

    
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'SIDCS: Inicio de Sesión', // Subject line
      template: './2fa', // `.ejs` extension is appended automatically
      context: { // filling <%= %> brackets with content
        name: user.name,
        code: token,
      },
    });
  }
}