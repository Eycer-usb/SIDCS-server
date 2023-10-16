import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLaboratorioClinicoDto } from '../dto/laboratorio-clinico/create-laboratorio-clinico.dto';
import { UpdateLaboratorioClinicoDto } from '../dto/laboratorio-clinico/update-laboratorio-clinico.dto';
import { LaboratorioClinico } from '../entities/laboratorio-clinico.entity';
import { Repository } from 'typeorm';
import { ImageService } from './image.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LaboratorioClinicoService {
  constructor(private imagesService: ImageService,
              @InjectRepository(LaboratorioClinico)
              private labRepository: Repository<LaboratorioClinico>
              ) {}

  async create(createLaboratorioClinicoDto: CreateLaboratorioClinicoDto) {
    const lab = new LaboratorioClinico();
    const { imagenes, ...asignable } = createLaboratorioClinicoDto;
    Object.assign(lab, asignable);
    try {
      this.imagesService.storage(imagenes, 'laboratorioClinico', lab);
      await this.labRepository.save(lab);
      const res = {
        status: 200,
        message: 'Laboratorio Clinico created successfully',
        data: await this.labRepository.findOneBy({id: lab.id})
      }
      return res;
    }
    catch (e) {
      console.log(e)
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
      const { imagenes, ...asignable } = updateLaboratorioClinicoDto;
      Object.assign(lab, asignable);
      if (imagenes) this.imagesService.update(imagenes, lab, 'laboratorioClinico');
      await this.labRepository.save(lab);      
      const res = {
        status: 200,
        message: 'Laboratorio Clinico updated successfully',
        data: await this.labRepository.findOneBy({id: lab.id})
      }
      return res;
    }
    catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Error en la actualización del laboratorio clínico");
    }
  }

  async remove(id: number) {
    const lab = this.labRepository.findOneBy({id});
    if (!lab) {
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
