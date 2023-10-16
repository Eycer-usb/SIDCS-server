import { Controller } from '@nestjs/common';
import { CreateCentroOftalmologicoDto } from '../dto/centro-oftalmologico/create-centro-oftalmologico.dto';
import { UpdateCentroOftalmologicoDto } from '../dto/centro-oftalmologico/update-centro-oftalmologico.dto';
import {Post, Body, Get, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CentroSaludService } from '../services/centro-salud.service';

@Controller('centro-oftalmologico')
export class CentroOftalmologicoController {
    constructor(private readonly centroOftalmologicoService: CentroSaludService) {}
  type = "centroOftalmologico";
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCentroOftalmologicoDto: CreateCentroOftalmologicoDto) {
    return this.centroOftalmologicoService.create(createCentroOftalmologicoDto, this.type);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.centroOftalmologicoService.findAll(this.type);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.centroOftalmologicoService.findOne(+id, this.type);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCentroOftalmologicoDto: UpdateCentroOftalmologicoDto) {
    return this.centroOftalmologicoService.update(+id, updateCentroOftalmologicoDto, this.type);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.centroOftalmologicoService.remove(+id, this.type);
  }

  @Patch('restore/:id')
  @UseGuards(JwtAuthGuard)
  restore(@Param('id') id: string) {
    return this.centroOftalmologicoService.restore(+id, this.type);
  }
}
