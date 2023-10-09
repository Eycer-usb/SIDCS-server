import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zona } from './entities/zona.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ZonaService {

  constructor(
    @InjectRepository(Zona)
    private zonaRepository: Repository<Zona>,
    private config: ConfigService
  ) {}

  async create(createZonaDto: CreateZonaDto): Promise<Zona | undefined> {
    const zona = new Zona();
    try {
      Object.assign(zona, createZonaDto);
      return this.zonaRepository.save(zona);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findAll(): Promise<Zona[] | undefined> {
    return this.zonaRepository.find();
  }

  async findOne(id: number): Promise<Zona | undefined> {
    const zona = await this.zonaRepository.findOneBy({id});
    if(!zona) throw new NotFoundException("Zona not found" + ` ${id}`);
    return zona;
  }

  async update(id: number, updateZonaDto: UpdateZonaDto){
    const zona = await this.zonaRepository.findOneBy({id});
    if (!zona) {
      throw new NotFoundException("Zona not found on update");
    }
    try {
      Object.assign(zona, updateZonaDto);
      await this.zonaRepository.update(id, zona);
      return {
        status: 200,
        message: 'Zona updated successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }

  async remove(id: number) {
    const zona = this.zonaRepository.findOneBy({id});
    if (!zona) {
      throw new NotFoundException("Zona not found on delete");
    }
    try {
      await this.zonaRepository.softDelete(id)
      return {
        status: 200,
        message: 'Zona deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }

  async restore(id: number) {
    if (id == null) throw new NotFoundException("Zona not found" + ` ${id}`);
    try {
      await this.zonaRepository.restore({id})
      return {
        status: 200,
        message: 'Zona restored successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }
}
