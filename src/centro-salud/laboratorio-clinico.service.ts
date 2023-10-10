import { Injectable } from '@nestjs/common';
import { CreateLaboratorioClinicoDto } from './dto/laboratorio-clinico/create-laboratorio-clinico.dto';
import { UpdateLaboratorioClinicoDto } from './dto/laboratorio-clinico/update-laboratorio-clinico.dto';

@Injectable()
export class LaboratorioClinicoService {
  create(createLaboratorioClinicoDto: CreateLaboratorioClinicoDto) {
    return 'This action adds a new centroSalud';
  }

  findAll() {
    return `This action returns all centroSalud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} centroSalud`;
  }

  update(id: number, updateLaboratorioClinicoDto: UpdateLaboratorioClinicoDto) {
    return `This action updates a #${id} centroSalud`;
  }

  remove(id: number) {
    return `This action removes a #${id} centroSalud`;
  }
}
