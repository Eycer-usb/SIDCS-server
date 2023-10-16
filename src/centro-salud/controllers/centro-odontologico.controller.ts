import { Controller } from '@nestjs/common';
import { CreateCentroOdontologicoDto } from '../dto/centro-odontologico/create-centro-odontologico.dto';
import { UpdateCentroOdontologicoDto } from '../dto/centro-odontologico/update-centro-odontologico.dto';
import {Post, Body, Get, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CentroSaludService } from '../services/centro-salud.service';

@Controller('centro-odontologico')
export class CentroOdontologicoController {
    constructor(private readonly centroOdontologicoService: CentroSaludService) {}
  type = "centroOdontologico";
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCentroOdontologicoDto: CreateCentroOdontologicoDto) {
    return this.centroOdontologicoService.create(createCentroOdontologicoDto, this.type);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.centroOdontologicoService.findAll(this.type);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.centroOdontologicoService.findOne(+id, this.type);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCentroOdontologicoDto: UpdateCentroOdontologicoDto) {
    return this.centroOdontologicoService.update(+id, updateCentroOdontologicoDto, this.type);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.centroOdontologicoService.remove(+id, this.type);
  }

  @Patch('restore/:id')
  @UseGuards(JwtAuthGuard)
  restore(@Param('id') id: string) {
    return this.centroOdontologicoService.restore(+id, this.type);
  }
}
