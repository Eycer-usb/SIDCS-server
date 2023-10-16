import { Module } from '@nestjs/common';
import { LaboratorioClinicoController } from './controllers/laboratorio-clinico.controller';
import { ImageController } from './controllers/image.controller';
import { ImageService } from './services/image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from './entities/imagen.entity';
import { LaboratorioClinico } from './entities/laboratorio-clinico.entity';
import { CentroOdontologico } from './entities/centro-odontologico.entity';
import { CentroOftalmologico } from './entities/centro-oftalmologico.entity';
import { ClinicaPrivada } from './entities/clinica-privada.entity';
import { GrupoMedico } from './entities/grupo-medico.entity';
import { GrupoMedicoController } from './controllers/grupo-medico.controller';
import { ClinicaPrivadaController } from './controllers/clinica-privada.controller';
import { CentroOftalmologicoController } from './controllers/centro-oftalmologico.controller';
import { CentroOdontologicoController } from './controllers/centro-odontologico.controller';
import { CentroSaludService } from './services/centro-salud.service';
import { CentroSaludController } from './controllers/centro-salud.controller';



@Module({
  imports: [ TypeOrmModule.forFeature([
    LaboratorioClinico,
    CentroOdontologico,
    CentroOftalmologico,
    ClinicaPrivada,
    GrupoMedico,
    Imagen
  ]) ],
  controllers: [
    LaboratorioClinicoController,
    ImageController, GrupoMedicoController,
    ClinicaPrivadaController,
    CentroOftalmologicoController,
    CentroOdontologicoController,
    CentroSaludController
  ],
  providers: [ImageService, CentroSaludService],
})
export class CentroSaludModule {}
