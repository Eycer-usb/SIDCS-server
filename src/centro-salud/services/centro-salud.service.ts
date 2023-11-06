import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { LaboratorioClinico } from '../entities/laboratorio-clinico.entity';
import { CentroOdontologico } from '../entities/centro-odontologico.entity';
import { CentroOftalmologico } from '../entities/centro-oftalmologico.entity';
import { ClinicaPrivada } from '../entities/clinica-privada.entity';
import { GrupoMedico } from '../entities/grupo-medico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageService } from './image.service';
import { ZonaService } from 'src/zona/zona.service';
import { LocalidadService } from 'src/localidad/localidad.service';
import { TipoGrupoMedicoService } from 'src/tipo-grupo-medico/tipo-grupo-medico.service';

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
      private imagesService: ImageService,
      private zonaService: ZonaService,
      private localidadService: LocalidadService,
      private tipoService: TipoGrupoMedicoService
    ) {}

  async findAllCentrosDeSalud() {
    const list = [
      ...(await this.labRepository.find()).map(lab => { return Object.assign({tipoCentroSalud: 'Laboratorio Clinico', route: "laboratorio-clinico"}, lab)}),
      ...((await this.odontoRepository.find()).map(odonto => { return Object.assign({tipoCentroSalud: 'Centro Odontologico', route: "centro-odontologico"}, odonto)})),
      ...(await this.oftalmoRepository.find()).map(oftalmo => { return Object.assign({tipoCentroSalud: 'Centro Oftalmologico', route: "centro-oftalmologico"}, oftalmo)}),
      ...(await this.clinicaRepository.find()).map(clinica => { return Object.assign({tipoCentroSalud: 'Clinica Privada', route: "clinica-privada"}, clinica)}),
      ...(await this.grupoRepository.find()).map(grupo => { return Object.assign({tipoCentroSalud: 'Grupo Medico', route: "grupo-medico"}, grupo)})
    ]
    return list;
  }

  getIdCS(type:string){
    switch (type) {
      case 'Laboratorio Clinico':
        return 'laboratorioClinico';
      case 'Centro Odontologico':
        return 'centroOdontologico'
      case 'Centro Oftalmologico':
        return 'centroOftalmologico';
      case 'Clinica Privada':
        return 'clinicaPrivada';
      case 'Grupo Medico':
        return 'grupoMedico';
      default:
        throw new NotFoundException(`Type ${type} not found`);
    }
  }

  async findQuery(query: any) {
    let result: Array<any> = await this.findAllCentrosDeSalud();

    // For every argument in query, filter result
    for (const property in query) {
      if (query.hasOwnProperty(property)) {
        const value = query[property];
        const key = property.includes('Id') && property != 'tipoCentroSaludId' ? property.slice(0, -2) : property ;
        // If is an array of ids, filter by id
        if (Array.isArray(value) && property != 'tipoCentroSaludId') {
          console.log('Filtering by ', key, value)
          result = result.filter(item => value.includes(item[key]?.id));
          console.log(result)
        }
        else if (property == 'tipoCentroSaludId') {
          console.log('Filtering by ', key, value)
          result = result.filter(item => value.includes(this.getIdCS(item.tipoCentroSalud)));
          console.log(result)
        }
        // If is a string, filter by name
        else if (typeof value === 'string') {
          result = result.filter(item => item[key].toLowerCase().includes(value.toLowerCase()));
        }
      }
    }
    return result;    
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
    const zona = await this.zonaService.findOne(createDto.zonaId);
    const localidad = await this.localidadService.findOne(createDto.localidadId);
    if (!zona) throw new NotFoundException(`Zona not found`);
    if (!localidad) throw new NotFoundException(`Localidad not found`);
    instance!.zona = zona;
    instance!.localidad = localidad;

    if(instance! instanceof GrupoMedico) {
      const tipo = await this.tipoService.findOne(createDto.tipoId);
      if (!tipo) throw new NotFoundException(`Tipo not found`);
      instance.tipo = tipo;
    }
    
    try {
      this.imagesService.storage(imagenes, type, instance!);
      console.log(instance!)
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
      
      const zona = await this.zonaService.findOne(updateDto.zonaId);
      const localidad = await this.localidadService.findOne(updateDto.localidadId);
      if (!zona) throw new NotFoundException(`Zona not found`);
      if (!localidad) throw new NotFoundException(`Localidad not found`);
      instance!.zona = zona;
      instance!.localidad = localidad;

      if(instance instanceof GrupoMedico) {
        const tipo = await this.tipoService.findOne(updateDto.tipoId);
        if (!tipo) throw new NotFoundException(`Tipo not found`);
        instance.tipo = tipo;
      }
      
      if (imagenes) this.imagesService.update(imagenes, instance, type);
      await repo.save(instance);      
      const res = {
        status: 200,
        message: `${name} updated successfully`,
        data: await repo.findOneBy({id: instance.id})
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