import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTipoGrupoMedicoDto } from './dto/create-tipo-grupo-medico.dto';
import { UpdateTipoGrupoMedicoDto } from './dto/update-tipo-grupo-medico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoGrupoMedico } from './entities/tipo-grupo-medico.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TipoGrupoMedicoService {

  constructor(
    @InjectRepository(TipoGrupoMedico)
    private tipoRepository: Repository<TipoGrupoMedico>,
    private config: ConfigService
  ) {}

  async create(createTipoGrupoMedicoDto: CreateTipoGrupoMedicoDto): Promise<TipoGrupoMedico | undefined> {
    const tipo = new TipoGrupoMedico();
    try {
      Object.assign(tipo, createTipoGrupoMedicoDto);
      return this.tipoRepository.save(tipo);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findAll(): Promise<TipoGrupoMedico[] | undefined> {
    return this.tipoRepository.find();
  }

  async findOne(id: number): Promise<TipoGrupoMedico | undefined> {
    const tipo = await this.tipoRepository.findOneBy({id});
    if(!tipo) throw new NotFoundException("Tipo Grupo Medico not found" + ` ${id}`);
    return tipo;
  }

  async update(id: number, updateTipoGrupoMedicoDto: UpdateTipoGrupoMedicoDto){
    const tipo = await this.tipoRepository.findOneBy({id});
    if (!tipo) {
      throw new NotFoundException("Tipo Grupo Medico not found on update");
    }
    try {
      Object.assign(tipo, updateTipoGrupoMedicoDto);
      await this.tipoRepository.update(id, tipo);
      return {
        status: 200,
        message: 'Tipo Grupo Medico updated successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }

  async remove(id: number) {
    const tipo = this.tipoRepository.findOneBy({id});
    if (!tipo) {
      throw new NotFoundException("Tipo Grupo Medico not found on delete");
    }
    try {
      await this.tipoRepository.softDelete(id)
      return {
        status: 200,
        message: 'Tipo Grupo Medico deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }

  async restore(id: number) {
    if (id == null) throw new NotFoundException("Tipo Grupo Medico not found" + ` ${id}`);
    try {
      await this.tipoRepository.restore({id})
      return {
        status: 200,
        message: 'Tipo Grupo Medico restored successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }
}
