import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';
import { Localidad } from './entities/localidad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';


@Injectable()
export class LocalidadService {
  constructor(
    @InjectRepository(Localidad)
    private zonaRepository: Repository<Localidad>,
  ) {}

  async create(createLocalidadDto: CreateLocalidadDto): Promise<Localidad | undefined> {
    const zona = new Localidad();
    try {
      Object.assign(zona, createLocalidadDto);
      return this.zonaRepository.save(zona);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findAll(): Promise<Localidad[] | undefined> {
    return this.zonaRepository.find();
  }

  async findOne(id: number): Promise<Localidad | undefined> {
    const zona = await this.zonaRepository.findOneBy({id});
    if(!zona) throw new NotFoundException("Localidad not found" + ` ${id}`);
    return zona;
  }

  async update(id: number, updateLocalidadDto: UpdateLocalidadDto){
    const zona = await this.zonaRepository.findOneBy({id});
    if (!zona) {
      throw new NotFoundException("Localidad not found on update");
    }
    try {
      Object.assign(zona, updateLocalidadDto);
      await this.zonaRepository.update(id, zona);
      return {
        status: 200,
        message: 'Localidad updated successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }

  async remove(id: number) {
    const zona = this.zonaRepository.findOneBy({id});
    if (!zona) {
      throw new NotFoundException("Localidad not found on delete");
    }
    try {
      await this.zonaRepository.softDelete(id)
      return {
        status: 200,
        message: 'Localidad deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }

  async restore(id: number) {
    if (id == null) throw new NotFoundException("Localidad not found" + ` ${id}`);
    try {
      await this.zonaRepository.restore({id})
      return {
        status: 200,
        message: 'Localidad restored successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }
}
