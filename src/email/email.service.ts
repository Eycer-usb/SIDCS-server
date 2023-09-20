import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/users.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService,
              private config: ConfigService ) {}

  /**
   * Send an email to verify the email address of a user
   */
  async validateEmail(user: User, jwt: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: '¡Bienvenido a SIDCS! Confirma tu Correo', // Subject line
      template: './email-verification', // `.ejs` extension is appended automatically
      context: { // filling <%= %> brackets with content
        name: user.name,
        link: `${this.config.get('HOST_URL')}:${this.config.get('PORT')}/auth/verify-email/${jwt}`,
      },
    });
  }

  /**
   * Send an email to recover the password of a user
   */
  async sendUserPasswordRecovery(user: User, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'SIDCS: Recuperación de Contraseña', // Subject line
      template: './recover-password', // `.ejs` extension is appended automatically
      context: { // filling <%= %> brackets with content
        name: user.name,
        code: token,
      },
    });
  }
}