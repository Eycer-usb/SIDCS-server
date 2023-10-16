import { Module } from '@nestjs/common';
import { TipoGrupoMedicoService } from './tipo-grupo-medico.service';
import { TipoGrupoMedicoController } from './tipo-grupo-medico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoGrupoMedico } from './entities/tipo-grupo-medico.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([TipoGrupoMedico]) ],
  controllers: [TipoGrupoMedicoController],
  providers: [TipoGrupoMedicoService],
  exports: [TipoGrupoMedicoService]
})
export class TipoGrupoMedicoModule {}
