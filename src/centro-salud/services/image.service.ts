import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LaboratorioClinico } from '../entities/laboratorio-clinico.entity';
import { CentroOdontologico } from '../entities/centro-odontologico.entity';
import { CentroOftalmologico } from '../entities/centro-oftalmologico.entity';
import { ClinicaPrivada } from '../entities/clinica-privada.entity';
import { GrupoMedico } from '../entities/grupo-medico.entity';
import { Imagen } from '../entities/imagen.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { assert } from 'console';

@Injectable()
export class ImageService {

    fs = require('fs');

    constructor(
      @InjectRepository(Imagen)
      private imagenRepository: Repository<Imagen>) { }

    private existsInUploads(images: string[]) {
      for(let image of images) {
        if (!this.fs.existsSync(`storage/uploads/${image}`)) {
          return false;
        }
      }
      return true;
    }

    private exists(images: string[]) {
      for(let image of images) {
        if (!this.fs.existsSync(`storage/centrosDeSalud/${image}`) && !this.fs.existsSync(`storage/uploads/${image}`)) {
          return false;
        }
      }
      return true;
    }

    create(images: Array<Express.Multer.File>) {
        return images.map(image => {
            return {
                filename: image.filename,
                path: image.path,
                size: image.size,
                mimetype: image.mimetype
            }
        });
    }

      storage(images: string[], 
        type: string, instance: LaboratorioClinico | CentroOdontologico |
         CentroOftalmologico | ClinicaPrivada | GrupoMedico) {

          if(this.existsInUploads(images)) {
            let list: Imagen[] = [];
            for(let name of images) {
                const image = new Imagen();
                switch (type) {
                  case 'laboratorioClinico':
                    image.laboratorioClinico = instance as LaboratorioClinico;
                    break;
                  case 'centroOdontologico':
                    image.centroOdontologico = instance as CentroOdontologico;
                    break;
                  case 'centroOftalmologico':
                    image.centroOftalmologico = instance as CentroOftalmologico;
                    break;
                  case 'clinicaPrivada':
                    image.clinicaPrivada = instance as ClinicaPrivada;
                    break;
                  case 'grupoMedico':
                    image.grupoMedico = instance as GrupoMedico;
                    break;
                  }
                image.url = name;
                this.fs.renameSync(`storage/uploads/${name}`, `storage/centrosDeSalud/${name}`);
                list.push(image);
            };
            instance.imagenes = list;
            return instance;
          } else {
            throw new Error("Image not found");
          }
    }

    async update(images: string[], instance: LaboratorioClinico | CentroOdontologico 
        | CentroOftalmologico | ClinicaPrivada | GrupoMedico,
        type: string) {
        if(this.exists(images)){

            let list: Imagen[] = instance.imagenes.filter(image => images.includes(image.url)); // Images to keep

            // Storing new images
            const newImages = images.filter(image => this.fs.existsSync(`storage/uploads/${image}`));
            for(let name of newImages) {
                const image = new Imagen();
                switch (type) {
                  case 'laboratorioClinico':
                    image.laboratorioClinico = instance as LaboratorioClinico;
                    break;
                  case 'centroOdontologico':
                    image.centroOdontologico = instance as CentroOdontologico;
                    break;
                  case 'centroOftalmologico':
                    image.centroOftalmologico = instance as CentroOftalmologico;
                    break;
                  case 'clinicaPrivada':
                    image.clinicaPrivada = instance as ClinicaPrivada;
                    break;
                  case 'grupoMedico':
                    image.grupoMedico = instance as GrupoMedico;
                    break;
                  }
                image.url = name;

                // Moving image from uploads to centroDeSalud
                this.fs.renameSync(`storage/uploads/${name}`, `storage/centrosDeSalud/${name}`);
                list.push(image);
            };

            // Deleting old images
            const oldImages = instance.imagenes.filter(image => !images.includes(image.url));
            for(let image of oldImages) {
                this.fs.renameSync(`storage/centrosDeSalud/${image.url}`, `storage/deleted/${image.url}`);
            }
            instance.imagenes = list;
            return instance;
        }
    }
}
