import { ConflictException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateLaboratorioClinicoDto } from '../dto/laboratorio-clinico/create-laboratorio-clinico.dto';
import { UpdateLaboratorioClinicoDto } from '../dto/laboratorio-clinico/update-laboratorio-clinico.dto';
import { CentroSaludService } from './centro-salud.service';
import { LaboratorioClinico } from '../entities/laboratorio-clinico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LaboratorioClinicoService {
  constructor(private centroSaludService: CentroSaludService,
              @Inject(LaboratorioClinico)
              private labRepository: Repository<LaboratorioClinico>
              ) {}

  async create(createLaboratorioClinicoDto: CreateLaboratorioClinicoDto) {
    const lab = new LaboratorioClinico();
    Object.assign(lab, createLaboratorioClinicoDto);
    try {
      return await this.labRepository.save(lab);
    }
    catch (e) {
      throw new InternalServerErrorException("Error on laboratorio clínico creation");
    }
  }

  async findAll() {
    return await this.labRepository.find();
  }

  async findOne(id: number) {
    const lab = await this.labRepository.findOneBy({id});
    if (!lab) {
      throw new ConflictException("Laboratorio clínico not found");
    }
    return lab;
  }

  async update(id: number, updateLaboratorioClinicoDto: UpdateLaboratorioClinicoDto) {
    const lab = await this.labRepository.findOneBy({id});
    if (!lab) {
      throw new ConflictException("Laboratorio clínico not found");
    }
    try {
      Object.assign(lab, updateLaboratorioClinicoDto);
      return await this.labRepository.update(id, lab);
    }
    catch (e) {
      throw new InternalServerErrorException("Error en la actualización del laboratorio clínico");
    }
  }

  async remove(id: number) {
    const zona = this.labRepository.findOneBy({id});
    if (!zona) {
      throw new NotFoundException("Laboratorio clínico not found on delete");
    }
    try {
      await this.labRepository.softDelete(id)
      return {
        status: 200,
        message: 'Laboratorio Clinico deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }

  async restore(id: number) {
    if (id == null) throw new NotFoundException("Laboratorio clínico not found" + ` ${id}`);
    try {
      await this.labRepository.restore({id})
      return {
        status: 200,
        message: 'Laboratorio Clinico restored successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }
}
