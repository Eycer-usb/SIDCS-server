source .env;
export PGPASSWORD=$DATABASE_PASSWORD;
psql -U $DATABASE_USERNAME -d $DATABASE_NAME -a -f ./src/database/ZonaSeeder.sql
psql -U $DATABASE_USERNAME -d $DATABASE_NAME -a -f ./src/database/LocalidadSeeder.sql
psql -U $DATABASE_USERNAME -d $DATABASE_NAME -a -f ./src/database/ZonaLocalidadSeeder.sql