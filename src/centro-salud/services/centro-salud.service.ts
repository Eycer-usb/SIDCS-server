import { Injectable } from '@nestjs/common';
import { LaboratorioClinico } from '../entities/laboratorio-clinico.entity';
import { CentroOdontologico } from '../entities/centro-odontologico.entity';
import { CentroOftalmologico } from '../entities/centro-oftalmologico.entity';
import { ClinicaPrivada } from '../entities/clinica-privada.entity';
import { GrupoMedico } from '../entities/grupo-medico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CentroSaludService {
  constructor( 
      @InjectRepository(LaboratorioClinico)
      private labRepository: Repository<LaboratorioClinico>,
      @InjectRepository(CentroOdontologico)
      private odontoRepository: Repository<CentroOdontologico>,
      @InjectRepository(CentroOftalmologico)
      private oftalmoRepository: Repository<CentroOftalmologico>,
      @InjectRepository(ClinicaPrivada)
      private clinicaRepository: Repository<ClinicaPrivada>,
      @InjectRepository(GrupoMedico)
      private grupoRepository: Repository<GrupoMedico>,
    ) {}

  findAll() {
    const list = [
        this.labRepository.find(),
        this.odontoRepository.find(),
        this.oftalmoRepository.find(),
        this.clinicaRepository.find(),
        this.grupoRepository.find()
    ]
    return list;
  }
}