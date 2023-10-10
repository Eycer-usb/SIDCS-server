import { Module } from '@nestjs/common';
import { LaboratorioClinicoService } from './laboratorio-clinico.service';
import { LaboratorioClinicoController } from './laboratorio-clinico.controller';

@Module({
  controllers: [LaboratorioClinicoController],
  providers: [LaboratorioClinicoService],
})
export class CentroSaludModule {}
