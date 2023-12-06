#!/bin/bash

# For run this script
# chmod +x ./src/database/seed.sh
# ./src/database/seed.sh

# Is necessary to have the .env file in the same directory where this script is executed
source .env;

# Set the environment variable for the database password
export PGPASSWORD=$DATABASE_PASSWORD;

# Tables Seeder names
TablesSeeder=(
    "ZonaSeeder"
    "LocalidadSeeder"
    "ZonaLocalidadSeeder"
    "TipoGrupoMedicoSeeder"
)

TablesCSV=(
    'laboratorioClinico'
    'imagen'
)

TableName=(
    'imagen'
    'laboratorio_clinico'
    'centro_odontologico'
    'centro_oftalmologico'
    'clinica_privada'
)

echo "Start seeding..."
# Drop tables
for table in ${TableName[@]};
do
    psql -h $DATABASE_HOST -U $DATABASE_USERNAME -d $DATABASE_NAME -a -c "DELETE FROM ${table}";
    psql -h $DATABASE_HOST -U $DATABASE_USERNAME -d $DATABASE_NAME -a -c "ALTER SEQUENCE ${table}_id_seq RESTART WITH 1;"
done
for (( idx=${#TablesSeeder[@]}-1 ; idx>=0 ; idx-- )) ; do
    psql -h $DATABASE_HOST -U $DATABASE_USERNAME -d $DATABASE_NAME -a -f ./src/database/${TablesSeeder[$idx]}/down.sql
done

# Seed tables
for table in ${TablesSeeder[@]};
do
    psql -h $DATABASE_HOST -U $DATABASE_USERNAME -d $DATABASE_NAME -a -f ./src/database/$table/up.sql
done

psql -h $DATABASE_HOST -U $DATABASE_USERNAME -d $DATABASE_NAME -a -c "\copy 
    public.laboratorio_clinico (
        nombre, direccion,
        latitud,longitud,
        tamano,limpieza,
        demanda,urocultivo,heces,orina,
        \"localidadId\", \"zonaId\",
        \"hematologiaCompleta\",perfil20,
        \"perfilTiroideo\",\"perfilPreoperatorio\",telefono
        ) FROM './src/database/laboratorioClinico.csv' DELIMITER ',' CSV HEADER;"

psql -h $DATABASE_HOST -U $DATABASE_USERNAME -d $DATABASE_NAME -a -c "\copy 
    public.centro_odontologico (
        nombre,direccion,latitud,
        longitud,telefono,tamano,
        limpieza,demanda,
        \"localidadId\", \"zonaId\",
        \"odontologiaGeneralDesde\",ortodoncia,
        endodoncia, \"cirugiaBucal\", protesis,
        \"rayosX\"
    ) FROM './src/database/centroOdontologico.csv' DELIMITER ',' CSV HEADER;"

psql -h $DATABASE_HOST -U $DATABASE_USERNAME -d $DATABASE_NAME -a -c "\copy 
    public.centro_oftalmologico (
        nombre,direccion,latitud,longitud,telefono,tamano,limpieza,demanda,
        \"localidadId\", \"zonaId\",
        \"oftalmologiaGeneralDesde\", \"tratamientoGlaucomaCataratas\",
        \"protesisOculares\", \"tratamientosEspecializados\", oncologia, otros
    ) FROM './src/database/centroOftalmologico.csv' DELIMITER ',' CSV HEADER;"

psql -h $DATABASE_HOST -U $DATABASE_USERNAME -d $DATABASE_NAME -a -c "\copy 
    public.clinica_privada (
        nombre,direccion,
        latitud,longitud,
        telefono,tamano,
        limpieza,demanda,
        \"localidadId\",\"zonaId\",
        emergencia, \"medicinaGeneral\",
        \"medicinaInterna\", pediatria,
        ginecologia, obstetricia,
        cardiologia, \"rayosXDeTorax\",
        \"tomografiaAbdominalPelvica\", \"resonanciaCerebral\",
        \"ecoAbdominal\", mamografia, \"densitometriaOsea\",
        \"hematologiaCompleta\", \"perfil20\",
        \"perfilTiroideo\", urocultivo, heces, orina,
        \"perfilPreoperatorio\", apendicectomia,
        \"colicistectomiaLamparoscopica\", \"herniorrafiaIngiunal\",
        cesarea, \"partoNormal\", hospitalizacion
    ) FROM './src/database/clinicaPrivada.csv' DELIMITER ',' CSV HEADER;"


psql -h $DATABASE_HOST -U $DATABASE_USERNAME -d $DATABASE_NAME -a -c "\copy
    public.imagen (
        url, \"laboratorioClinicoId\",
        \"centroOftalmologicoId\", \"centroOdontologicoId\",
        \"clinicaPrivadaId\",\"grupoMedicoId\"
        ) FROM './src/database/imagen.csv' DELIMITER ',' CSV HEADER;"

echo "Seeding finished!"