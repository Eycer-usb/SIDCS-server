import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { EmailModule } from './email/email.module';
import { ZonaModule } from './zona/zona.module';
import { LocalidadModule } from './localidad/localidad.module';
import { CentroSaludModule } from './centro-salud/centro-salud.module';
import configuration from '../config/configuration';
import typeOrmConfig from '../config/typeorm.config';
import { TipoGrupoMedicoModule } from './tipo-grupo-medico/tipo-grupo-medico.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(typeOrmConfig()),
    AuthModule,
    UsersModule,
    RolesModule,
    EmailModule,
    ZonaModule,
    LocalidadModule,
    TipoGrupoMedicoModule,
    CentroSaludModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
