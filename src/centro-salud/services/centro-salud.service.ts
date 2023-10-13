import { Injectable } from '@nestjs/common';
import { CreateCentroSaludDto } from '../dto/create-centro-salud.dto';
import { UpdateCentroSaludDto } from '../dto/update-centro-salud.dto';
import { LaboratorioClinico } from '../entities/laboratorio-clinico.entity';
import { CentroOdontologico } from '../entities/centro-odontologico.entity';
import { CentroOftalmologico } from '../entities/centro-oftalmologico.entity';
import { ClinicaPrivada } from '../entities/clinica-privada.entity';
import { GrupoMedico } from '../entities/grupo-medico.entity';
import { CentroSalud } from '../entities/centro-salud.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imagen } from '../entities/imagen.entity';

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
        @InjectRepository(Imagen)
        private imagenRepository: Repository<Imagen>,
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