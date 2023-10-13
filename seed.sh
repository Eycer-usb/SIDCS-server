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

# Drop tables
for (( idx=${#TablesSeeder[@]}-1 ; idx>=0 ; idx-- )) ; do
    sudo -u postgres psql -U $DATABASE_USERNAME -d $DATABASE_NAME -a -f ./src/database/${TablesSeeder[$idx]}/down.sql
done

# Seed tables
for table in ${TablesSeeder[@]};
do
    sudo -u postgres psql -U $DATABASE_USERNAME -d $DATABASE_NAME -a -f ./src/database/$table/up.sql
done