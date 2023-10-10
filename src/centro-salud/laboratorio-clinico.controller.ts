import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LaboratorioClinicoService } from './laboratorio-clinico.service';
import { CreateLaboratorioClinicoDto } from './dto/laboratorio-clinico/create-laboratorio-clinico.dto';
import { UpdateLaboratorioClinicoDto } from './dto/laboratorio-clinico/update-laboratorio-clinico.dto';

@Controller('centro-salud')
export class LaboratorioClinicoController {
  constructor(private readonly centroSaludService: LaboratorioClinicoService) {}

  @Post()
  create(@Body() createLaboratorioClinicoDto: CreateLaboratorioClinicoDto) {
    return this.centroSaludService.create(createLaboratorioClinicoDto);
  }

  @Get()
  findAll() {
    return this.centroSaludService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centroSaludService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLaboratorioClinicoDto: UpdateLaboratorioClinicoDto) {
    return this.centroSaludService.update(+id, updateLaboratorioClinicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centroSaludService.remove(+id);
  }
}
