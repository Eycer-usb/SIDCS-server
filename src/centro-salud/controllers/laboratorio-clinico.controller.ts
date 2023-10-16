import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateLaboratorioClinicoDto } from '../dto/laboratorio-clinico/create-laboratorio-clinico.dto';
import { UpdateLaboratorioClinicoDto } from '../dto/laboratorio-clinico/update-laboratorio-clinico.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CentroSaludService } from '../services/centro-salud.service';

@Controller('laboratorio-clinico')
export class LaboratorioClinicoController {
  type = "laboratorioClinico";
  constructor(private readonly labService: CentroSaludService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createLaboratorioClinicoDto: CreateLaboratorioClinicoDto) {
    return this.labService.create(createLaboratorioClinicoDto, this.type);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.labService.findAll(this.type);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.labService.findOne(+id, this.type);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateLaboratorioClinicoDto: UpdateLaboratorioClinicoDto) {
    return this.labService.update(+id, updateLaboratorioClinicoDto, this.type);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.labService.remove(+id, this.type);
  }

  @Patch('restore/:id')
  @UseGuards(JwtAuthGuard)
  restore(@Param('id') id: string) {
    return this.labService.restore(+id, this.type);
  }
}
