/**
 * To Do:
 * - Establecer correctamente los Dtos de validacion al heredar esta clase como controlador base
 * - Actualmente se usa un controlador por tipo de centro de salud, pero se quiere poder
 *  usar un solo controlador para todos los tipos
 */

import { Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CentroSaludService } from '../services/centro-salud.service';
import { CreateCentroOdontologicoDto } from '../dto/centro-odontologico/create-centro-odontologico.dto';
import { CreateCentroOftalmologicoDto } from '../dto/centro-oftalmologico/create-centro-oftalmologico.dto';
import { CreateClinicaPrivadaDto } from '../dto/clinica-privada/create-clinica-privada.dto';
import { CreateGrupoMedicoDto } from '../dto/grupo-medico/create-grupo-medico.dto';
import { CreateLaboratorioClinicoDto } from '../dto/laboratorio-clinico/create-laboratorio-clinico.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateCentroOdontologicoDto } from '../dto/centro-odontologico/update-centro-odontologico.dto';
import { UpdateCentroOftalmologicoDto } from '../dto/centro-oftalmologico/update-centro-oftalmologico.dto';
import { UpdateClinicaPrivadaDto } from '../dto/clinica-privada/update-clinica-privada.dto';
import { UpdateGrupoMedicoDto } from '../dto/grupo-medico/update-grupo-medico.dto';
import { UpdateLaboratorioClinicoDto } from '../dto/laboratorio-clinico/update-laboratorio-clinico.dto';

export abstract class CentroSaludController {
    
    constructor(
        protected readonly service: CentroSaludService,
        protected type:string,
        protected createDto:  CreateCentroOdontologicoDto |  CreateCentroOftalmologicoDto |  CreateClinicaPrivadaDto |  CreateGrupoMedicoDto |  CreateLaboratorioClinicoDto,
        protected updateDto:  UpdateCentroOdontologicoDto |  UpdateCentroOftalmologicoDto |  UpdateClinicaPrivadaDto |  UpdateGrupoMedicoDto |  UpdateLaboratorioClinicoDto
        ) { }
    
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createLaboratorioClinicoDto: typeof this.createDto ) {
        return this.service.create(createLaboratorioClinicoDto, this.type);
    }
    
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.service.findAll(this.type);
    }
    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.service.findOne(+id, this.type);
    }
    
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateLaboratorioClinicoDto: typeof this.updateDto) {
        return this.service.update(+id, updateLaboratorioClinicoDto, this.type);
    }
    
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.service.remove(+id, this.type);
    }
    
    @Patch('restore/:id')
    @UseGuards(JwtAuthGuard)
    restore(@Param('id') id: string) {
        return this.service.restore(+id, this.type);
    }
}