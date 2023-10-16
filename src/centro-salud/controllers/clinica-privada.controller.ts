import { Controller } from '@nestjs/common';
import { CreateClinicaPrivadaDto } from '../dto/clinica-privada/create-clinica-privada.dto';
import { UpdateClinicaPrivadaDto } from '../dto/clinica-privada/update-clinica-privada.dto';
import {Post, Body, Get, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CentroSaludService } from '../services/centro-salud.service';

@Controller('clinica-privada')
export class ClinicaPrivadaController {
    constructor(private readonly clinicaPrivadaService: CentroSaludService) {}
  type = "clinicaPrivada";
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createClinicaPrivadaDto: CreateClinicaPrivadaDto) {
    return this.clinicaPrivadaService.create(createClinicaPrivadaDto, this.type);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.clinicaPrivadaService.findAll(this.type);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.clinicaPrivadaService.findOne(+id, this.type);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateClinicaPrivadaDto: UpdateClinicaPrivadaDto) {
    return this.clinicaPrivadaService.update(+id, updateClinicaPrivadaDto, this.type);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.clinicaPrivadaService.remove(+id, this.type);
  }

  @Patch('restore/:id')
  @UseGuards(JwtAuthGuard)
  restore(@Param('id') id: string) {
    return this.clinicaPrivadaService.restore(+id, this.type);
  }
}
