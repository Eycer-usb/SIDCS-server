import { Module } from '@nestjs/common';
import { LaboratorioClinicoService } from './services/laboratorio-clinico.service';
import { LaboratorioClinicoController } from './controllers/laboratorio-clinico.controller';
import { ImageController } from './controllers/image.controller';
import { ImageService } from './services/image.service';

@Module({
  controllers: [LaboratorioClinicoController, ImageController],
  providers: [LaboratorioClinicoService, ImageService],
})
export class CentroSaludModule {}
