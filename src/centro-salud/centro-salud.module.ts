import { Module } from '@nestjs/common';
import { LaboratorioClinicoService } from './services/laboratorio-clinico.service';
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



@Module({
  imports: [ TypeOrmModule.forFeature([
    LaboratorioClinico,
    CentroOdontologico,
    CentroOftalmologico,
    ClinicaPrivada,
    GrupoMedico,
    Imagen
  ]) ],
  controllers: [LaboratorioClinicoController, ImageController],
  providers: [LaboratorioClinicoService, ImageService],
})
export class CentroSaludModule {}
