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
    private localidadRepository: Repository<Localidad>,
  ) {}

  async create(createLocalidadDto: CreateLocalidadDto): Promise<Localidad | undefined> {
    const zona = new Localidad();
    try {
      Object.assign(zona, createLocalidadDto);
      return this.localidadRepository.save(zona);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async findAll(zonasAsStringArray: any): Promise<Localidad[] | undefined> {
    if (zonasAsStringArray ) {
      const all = await this.localidadRepository.find();
      let zonas
      if(Array.isArray(zonasAsStringArray)){
        zonas = zonasAsStringArray.map((zona: any) => parseInt(zona));
      }
      else{
        zonas = [parseInt(zonasAsStringArray)];
      }

      let response = [];
      for(let i = 0; i < all.length; i++){
        for(let j = 0; j < all[i].zonas.length; j++){
          if(zonas.includes(all[i].zonas[j].id)){
            response.push(all[i]);
            break;
          }
        }
      }
      return response;
    }
    return this.localidadRepository.find();
  }

  async findOne(id: number): Promise<Localidad | undefined> {
    const zona = await this.localidadRepository.findOneBy({id});
    if(!zona) throw new NotFoundException("Localidad not found" + ` ${id}`);
    return zona;
  }

  async update(id: number, updateLocalidadDto: UpdateLocalidadDto){
    const zona = await this.localidadRepository.findOneBy({id});
    if (!zona) {
      throw new NotFoundException("Localidad not found on update");
    }
    try {
      Object.assign(zona, updateLocalidadDto);
      await this.localidadRepository.update(id, zona);
      return {
        status: 200,
        message: 'Localidad updated successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }

  async remove(id: number) {
    const zona = this.localidadRepository.findOneBy({id});
    if (!zona) {
      throw new NotFoundException("Localidad not found on delete");
    }
    try {
      await this.localidadRepository.softDelete(id)
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
      await this.localidadRepository.restore({id})
      return {
        status: 200,
        message: 'Localidad restored successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}}`);
    }
  }
}
