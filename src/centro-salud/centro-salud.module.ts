import { Module } from '@nestjs/common';
import { LaboratorioClinicoService } from './services/laboratorio-clinico.service';
import { LaboratorioClinicoController } from './controllers/laboratorio-clinico.controller';

@Module({
  controllers: [LaboratorioClinicoController],
  providers: [LaboratorioClinicoService],
})
export class CentroSaludModule {}
