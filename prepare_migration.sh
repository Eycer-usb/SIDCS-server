#!/bin/bash

python3 scripts/migrations/prepare.py laboratorioClinico scripts/migrations/excel/laboratorioClinico.xlsx src/database/ "TODOS LOS LABORATORIOS"
python3 scripts/migrations/prepare.py centroOftalmologico scripts/migrations/excel/centroOftalmologico.xlsx src/database/ "ZONAS CENTROS OFTALMOLÓGICOS"
python3 scripts/migrations/prepare.py centroOdontologico scripts/migrations/excel/centroOdontologico.xlsx src/database/ "ZONAS CENTROS ODONTOLÓGICOS"
python3 scripts/migrations/prepare.py clinicaPrivada scripts/migrations/excel/clinicaPrivada.xlsx src/database/ "COMPILADO CLÍNICAS PRIVADAS"


python3 scripts/migrations/prepare.py  imagen src/database/