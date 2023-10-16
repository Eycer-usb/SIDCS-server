import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LaboratorioClinicoService } from '../services/laboratorio-clinico.service';
import { CreateLaboratorioClinicoDto } from '../dto/laboratorio-clinico/create-laboratorio-clinico.dto';
import { UpdateLaboratorioClinicoDto } from '../dto/laboratorio-clinico/update-laboratorio-clinico.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('laboratorio-clinico')
export class LaboratorioClinicoController {
  constructor(private readonly labService: LaboratorioClinicoService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  create(@Body() createLaboratorioClinicoDto: CreateLaboratorioClinicoDto) {
    return this.labService.create(createLaboratorioClinicoDto);
  }

  @Get()
  findAll() {
    return this.labService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLaboratorioClinicoDto: UpdateLaboratorioClinicoDto) {
    return this.labService.update(+id, updateLaboratorioClinicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labService.remove(+id);
  }

  @Patch('restore/:id')
  // @UseGuards(JwtAuthGuard)
  restore(@Param('id') id: string) {
    return this.labService.restore(+id);
  }
}
