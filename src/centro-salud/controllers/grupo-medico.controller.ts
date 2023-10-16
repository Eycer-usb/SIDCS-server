import { Controller } from '@nestjs/common';
import { CreateGrupoMedicoDto } from '../dto/grupo-medico/create-grupo-medico.dto';
import { UpdateGrupoMedicoDto } from '../dto/grupo-medico/update-grupo-medico.dto';
import {Post, Body, Get, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CentroSaludService } from '../services/centro-salud.service';

@Controller('grupo-medico')
export class GrupoMedicoController {
    constructor(private readonly grupoMedicoService: CentroSaludService) {}
  type = "grupoMedico"
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createGrupoMedicoDto: CreateGrupoMedicoDto) {
    return this.grupoMedicoService.create(createGrupoMedicoDto, this.type);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.grupoMedicoService.findAll(this.type);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.grupoMedicoService.findOne(+id, this.type);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateGrupoMedicoDto: UpdateGrupoMedicoDto) {
    return this.grupoMedicoService.update(+id, updateGrupoMedicoDto, this.type);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.grupoMedicoService.remove(+id, this.type);
  }

  @Patch('restore/:id')
  @UseGuards(JwtAuthGuard)
  restore(@Param('id') id: string) {
    return this.grupoMedicoService.restore(+id, this.type);
  }
}
