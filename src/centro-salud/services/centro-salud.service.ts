import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { LaboratorioClinico } from '../entities/laboratorio-clinico.entity';
import { CentroOdontologico } from '../entities/centro-odontologico.entity';
import { CentroOftalmologico } from '../entities/centro-oftalmologico.entity';
import { ClinicaPrivada } from '../entities/clinica-privada.entity';
import { GrupoMedico } from '../entities/grupo-medico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageService } from './image.service';

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
      private imagesService: ImageService
    ) {}

  findAllCentrosDeSalud() {
    const list = [
        this.labRepository.find(),
        this.odontoRepository.find(),
        this.oftalmoRepository.find(),
        this.clinicaRepository.find(),
        this.grupoRepository.find()
    ]
    return list;
  }

  async create(createDto: any, type: string) {
    let instance: LaboratorioClinico | CentroOdontologico | CentroOftalmologico | ClinicaPrivada | GrupoMedico;
    let name = "";
    switch (type) {
      case 'laboratorioClinico':
        instance = new LaboratorioClinico;
        name = "Laboratorio Clinico";
        break;
      case 'centroOdontologico':
        instance = new CentroOdontologico;
        name = "Centro Odontologico";
        break;
      case 'centroOftalmologico':
        instance = new CentroOftalmologico;
        name = "Centro Oftalmologico";
        break;
      case 'clinicaPrivada':
        instance = new ClinicaPrivada;
        name = "Clinica Privada";
        break;
      case 'grupoMedico':
        instance = new GrupoMedico;
        name = "Grupo Medico";
        break;
    }
    const { imagenes, ...asignable } = createDto;
    Object.assign(instance!, asignable);
    try {
      this.imagesService.storage(imagenes, type, instance!);
      const { repo, name } = this.getRepo(type);
      await repo.save(instance!);
      const res = {
        status: 200,
        message: `${name} created successfully`,
        data: await repo.findOneBy({id: instance!.id})
      }
      return res;
    }
    catch (e) {
      console.log(e)
      throw new InternalServerErrorException(`Error on ${name} creation`);
    }
  }

  async findAll(type: string) {
    const { repo, name } = this.getRepo(type);
    return await repo.find();
  }

  async findOne(id: number, type: string) {
    const { repo, name } = this.getRepo(type);
    const instance = await repo.findOneBy({id});
    if (!instance) {
      throw new ConflictException(`${name} not found`);
    }
    return instance;
  }

  private getRepo(type: string) : {repo: Repository<any>, name: string} {
    let repo: Repository<any>;
    let name = "";
    switch (type) {
      case 'laboratorioClinico':
        repo = this.labRepository;
        name = 'Laboratorio Clinico'
        break;
      case 'centroOdontologico':
        repo = this.odontoRepository;
        name = 'Centro Odontologico'
        break;
      case 'centroOftalmologico':
        repo = this.oftalmoRepository;
        name = 'Centro Oftalmologico'
        break;
      case 'clinicaPrivada':
        repo = this.clinicaRepository;
        name = 'Clinica Privada'
        break;
      case 'grupoMedico':
        repo = this.grupoRepository;
        name = 'Grupo Medico'
        break;
      default:
        throw new NotFoundException(`Type ${type} not found`);
    }
    return { repo, name }
  }

  async update(id: number, updateDto: any, type: string) {

    const {repo, name} = this.getRepo(type);
    const instance = await repo.findOneBy({id});
    if (!instance) {
      throw new ConflictException(`${name} not found`);
    }
    try {
      const { imagenes, ...asignable } = updateDto;
      Object.assign(instance, asignable);
      if (imagenes) this.imagesService.update(imagenes, instance, type);
      await this.labRepository.save(instance);      
      const res = {
        status: 200,
        message: `${name} updated successfully`,
        data: await this.labRepository.findOneBy({id: instance.id})
      }
      return res;
    }
    catch (e) {
      console.log(e);
      throw new InternalServerErrorException(`Error updating ${name}`);
    }
  }

  async remove(id: number, type: string) {
    const {repo, name} = this.getRepo(type);
    const lab = repo.findOneBy({id});
    if (!lab) {
      throw new NotFoundException(`${name} not found on delete`);
    }
    try {
      await repo.softDelete(id)
      return {
        status: 200,
        message: `${name} deleted successfully`,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }

  async restore(id: number, type: string) {
    const {repo, name} = this.getRepo(type);
    if (id == null) throw new NotFoundException(`${name} not found ${id}`);
    try {
      await repo.restore({id})
      return {
        status: 200,
        message: `${name} restored successfully`,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }
}