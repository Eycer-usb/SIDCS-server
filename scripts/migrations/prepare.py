"""
To be run before running the migrations.

This script will prepare the csv files for the migrations.

Recieves the following arguments:
    - table name (the name of the table to be migrated)
    - path to the csv files
    - path to the migrations folder (where the CSV file will be saved)
    - sheet name (optional, defaults to 'ZONAS')
"""

import sys
import os
import pandas as pd
import requests
import re
from load_images import download_zips, decompress_imagen, move_imagenes_to_storage

locations_csv = 'csv/localidades.csv'
imagen_header = ["url","laboratorioClinicoId", "centroOftalmologicoId",
    "centroOdontologicoId","clinicaPrivadaId", "grupoMedicoId" ]
laboratorio_clinico_header = ["nombre","direccion","latitud","longitud",
               "tamano","limpieza","demanda",
               "urocultivo","heces","orina","localidadId",
               "zonaId","hematologiaCompleta","perfil20","perfilTiroideo",
               "perfilPreoperatorio","telefono"]
laboratorio_clinico_dict = {
    'nombre': 'NOMBRE',
    'direccion': 'DIRECCIÓN',
    'tamano': 'TAMAÑO',
    'limpieza': 'LIMPIEZA',
    'demanda': 'DEMANDA',
    'urocultivo': 'UROCULTIVO',
    'heces': 'HECES',
    'orina': 'ORINA',
    'zonaId': 'ZONA',
    'hematologiaCompleta': 'HEMATOLOGÍA COMPLETA',
    'perfil20': 'PERFIL 20',
    'perfilTiroideo': 'PERFIL TIROIDEO',
    'perfilPreoperatorio': 'PERFIL PRE OPERATORIO',
    'telefono': 'TELÉFONOS'
}

centro_oftalmologico_header = [
    "nombre","direccion","latitud","longitud", "telefono",
    "tamano","limpieza","demanda",
    "localidadId","zonaId",
    "oftalmologiaGeneralDesde",
    "tratamientoGlaucomaCataratas", "protesisOculares",
    "tratamientosEspecializados", "oncologia", "otros"
]

centro_oftalmologico_dict = {
    'zonaId': 'ZONA',
    'nombre': 'NOMBRE',
    'direccion': 'DIRECCIÓN',
    'tamano': 'TAMAÑO',
    'limpieza': 'LIMPIEZA',
    'demanda': 'DEMANDA',
    'oftalmologiaGeneralDesde': 'OFTALMOLOGÍA GENERAL',
    'tratamientoGlaucomaCataratas': 'TRAT. GLAUCOMA, CATARATAS',
    'protesisOculares': 'PRÓTESIS OCULARES',
    'tratamientosEspecializados': 'TRAT. ESPECIALIZADOS',
    'oncologia': 'ONCOLOGÍA',
    'otros': 'OTROS',
    'telefono': 'TELÉFONOS'
}

centro_odontologico_header = [
    "nombre","direccion","latitud","longitud", "telefono",
    "tamano","limpieza","demanda",
    "localidadId","zonaId",
    "odontologiaGeneralDesde",
    "ortodoncia", "endodoncia", "cirugiaBucal", 'protesis', "rayosX"
]

centro_odontologico_dict = { 
    'zonaId': 'ZONA',
    'nombre': 'NOMBRE',
    'direccion': 'DIRECCIÓN',
    'tamano': 'TAMAÑO',
    'limpieza': 'LIMPIEZA',
    'demanda': 'DEMANDA',
    'odontologiaGeneralDesde': 'ODONTOLOGÍA GENERAL',
    'ortodoncia': 'ORTODONCIA',
    'endodoncia': 'ENDODONCIA',
    'cirugiaBucal': 'CIRUGÍA BUCAL',
    'protesis': 'PRÓTESIS',
    'rayosX': 'RAYOS X',
    'telefono': 'TELÉFONOS'
 }
clinica_privada_header = [
    "nombre","direccion","latitud","longitud", "telefono",
    "tamano","limpieza","demanda",
    "localidadId","zonaId",
    "emergencia", "medicinaGeneral", "medicinaInterna",
    "pediatria", "ginecologia", "obstetricia", "cardiologia",
    "rayosXDeTorax", "tomografiaAbdominalPelvica", "resonanciaCerebral",
    "ecoAbdominal", "mamografia", "densitometriaOsea", "hematologiaCompleta",
    "perfil20", "perfilTiroideo", "urocultivo", "heces", "orina",
    "perfilPreoperatorio", "apendicectomia", "colicistectomiaLamparoscopica", "herniorrafiaIngiunal",
    "cesarea", "partoNormal", "hospitalizacion"
]
clinica_privada_dict = {
    'zonaId': 'ZONA',
    'nombre': 'NOMBRE',
    'direccion': 'DIRECCIÓN',
    'tamano': 'TAMAÑO',
    'limpieza': 'LIMPIEZA',
    'demanda': 'DEMANDA',
    'emergencia': 'EMERGENCIA',
    'medicinaGeneral': 'MEDICINA GENERAL',
    'medicinaInterna': 'MEDICINA INTERNA',
    'pediatria': 'PEDIATRÍA',
    'ginecologia': 'GINECOLOGÍA',
    'obstetricia': 'OBSTETRICIA',
    'cardiologia': 'CARDIOLOGÍA',
    'perfilPreoperatorio': 'PERFIL PRE OPERATORIO',
    'rayosXDeTorax': 'RAYOS X DE TÓRAX',
    'tomografiaAbdominalPelvica': 'TOMOGRAFÍA ABDOMINAL PÉLVICA',
    'resonanciaCerebral': 'RESONANCIA CEREBRAL',
    'ecoAbdominal': 'ECO ABDOMINAL',
    'mamografia': 'MAMOGRAFÍA',
    'densitometriaOsea': 'DENSITOMETRÍA ÓSEA',
    'hematologiaCompleta': 'HEMATOLOGÍA COMPLETA',
    'perfil20': 'PERFIL 20',
    'perfilTiroideo': 'PERFIL TIROIDEO',
    'urocultivo': 'UROCULTIVO',
    'heces': 'HECES',
    'orina': 'ORINA',
    'apendicectomia': 'APENDICECTOMÍA',
    'colicistectomiaLamparoscopica': 'COLECISTECTOMÍA LAMPAROSCÓPICA',
    'herniorrafiaIngiunal': 'HERNIORRAFÍA INGUINAL',
    'cesarea': 'CESÁREA',
    'partoNormal': 'PARTO NORMAL',
    'hospitalizacion': 'DÍA DE HOSPITALIZACIÓN',
    'telefono': 'TELÉFONOS'
}
grupo_medico_header = [
    "nombre","direccion","latitud","longitud", "telefono",
    "tamano","limpieza","demanda",
    "localidadId","zonaId",
    "medicinaGeneral", "medicinaInterna",
    "pediatria", "ginecologia", "obstetricia", "cardiologia",
    "gastro", "neurologia", "medicinaFyR", "observacionesConsulta",
    "rayosXDeTorax", "tomografiaAbdominalPelvica", "resonanciaCerebral",
    "ecoAbdominal", "mamografia", "densitometriaOsea", "epirometria",
    "eeg", "observacionesDiagnostico", "hematologiaCompleta", "perfil20", "perfilTiroideo",
    "urocultivo", "heces", "orina", "perfilPreoperatorio",
    "apendicectomia", "colicistectomiaLamparoscopica", "herniorrafiaIngiunal",
    "cesarea", "partoNormal", "hospitalizacion"
]
grupo_medico_dict = {
    'zonaId': 'ZONA',
    'nombre': 'NOMBRE',
    'direccion': 'DIRECCIÓN',
    'tamano': 'TAMAÑO',
    'limpieza': 'LIMPIEZA',
    'demanda': 'DEMANDA',
    'medicinaGeneral': 'MEDICINA GENERAL',
    'medicinaInterna': 'MEDICINA INTERNA',
    'pediatria': 'PEDIATRÍA',
    'ginecologia': 'GINECOLOGÍA',
    'obstetricia': 'OBSTETRICIA',
    'cardiologia': 'CARDIOLOGÍA',
    'gastro': 'GASTRO',
    'neurologia': 'NEUROLOGÍA',
    'medicinaFyR': 'MEDICINA F. Y R.',
    'rayosXDeTorax': 'RAYOS X DE TÓRAX',
    'tomografiaAbdominalPelvica': 'TOMOGRAFÍA ABDOMINAL PÉLVICA',
    'resonanciaCerebral': 'RESONANCIA CEREBRAL',
    'ecoAbdominal': 'ECO ABDOMINAL',
    'mamografia': 'MAMOGRAFÍA',
    'densitometriaOsea': 'DENSITOMETRÍA ÓSEA',
    'epirometria': 'ESPIROMETRÍA',
    'eeg': 'EEG',
    'hematologiaCompleta': 'HEMATOLOGÍA COMPLETA',
    'perfil20': 'PERFIL 20',
    'perfilTiroideo': 'PERFIL TIROIDEO',
    'urocultivo': 'UROCULTIVO',
    'heces': 'HECES',
    'orina': 'ORINA',
    'perfilPreoperatorio': 'PERFIL PRE OPERATORIO',
    'apendicectomia': 'APENDICECTOMÍA',
    'colicistectomiaLamparoscopica': 'COLECISTECTOMÍA LAMPAROSCÓPICA',
    'herniorrafiaIngiunal': 'HERNIORRAFÍA INGUINAL',
    'cesarea': 'CESÁREA',
    'partoNormal': 'PARTO NORMAL',
    'hospitalizacion': 'HOSPITALIZACIÓN',
    'observacionesConsulta': 'OBSERVACIONES CONSULTAS',
    'observacionesDiagnostico': "OBSERVACIONES DIAGNÓSTICO"
}

def get_locations_dictionary() -> dict:
    dirname = os.path.dirname(__file__)
    df = pd.read_csv(os.path.join(dirname, locations_csv))
    dic = { key: value for (key, value) in zip(df['descripcion'], df['id']) }
    return dic

def get_foreign_key_locations(df: pd.DataFrame) -> pd.DataFrame:
    locations_dic = get_locations_dictionary()
    if 'ZONA.1' in df.columns:
        return df['ZONA.1'].apply(lambda row: locations_dic[row])
    else:
        return df['METRO'].apply(lambda row: locations_dic[row])
def unshorten_url(url):
    return requests.head(url, allow_redirects=True).url

def convert_route_to_lat_long(route: str) -> dict:
    long_url = unshorten_url(route)
    match = re.search(r'(-?\d+.\d+),(-?\d+.\d+)', long_url)
    if match:
        return match.group(1), match.group(2)
    else:
        return None, None


def get_lat_long(df: pd.DataFrame) -> pd.DataFrame:
    print('Getting latitude and longitude for each route')
    out = pd.DataFrame(columns=['latitud', 'longitud'])
    for index, row in df.iterrows():
        lat_lon = str(row['COORDENADAS']).split(',')
        lat = lat_lon[0]
        lon = lat_lon[1]
        if lon is None or lat is None:
            print('Error on row: ', row['NOMBRE'])
        else:
            print('.', end='', flush=True)
        out.loc[index] = [lat, lon]
    print('\n', end='', flush=True)
    return out


def init_dataframe(table_name) -> pd.DataFrame:
    columns = []
    if table_name == 'laboratorioClinico':
        columns = laboratorio_clinico_header
    elif table_name == 'centroOftalmologico':
        columns = centro_oftalmologico_header
    elif table_name == 'centroOdontologico':
        columns = centro_odontologico_header
    elif table_name == 'clinicaPrivada':
        columns = clinica_privada_header
    elif table_name == 'grupoMedico':
        columns = grupo_medico_header
    else:
        raise Exception('Invalid table name')
    return pd.DataFrame(columns=columns)

def get_dict(name: str) -> dict:
    if name == 'laboratorioClinico':
        return laboratorio_clinico_dict
    elif name == 'centroOftalmologico':
        return centro_oftalmologico_dict
    elif name == 'centroOdontologico':
        return centro_odontologico_dict
    elif name == 'clinicaPrivada':
        return clinica_privada_dict
    elif name == 'grupoMedico':
        return grupo_medico_dict
    else:
        raise Exception('Invalid table name')

def convert_if_boolean(value: str) -> bool:
    if  str(value).strip() == 'Sí':
        return 'true'
    elif  str(value).strip() == 'SÍ':
        return 'true'
    elif  str(value).strip() == 'si':
        return 'true'
    elif  str(value).strip() == 'Si':
        return 'true'
    elif  str(value).strip() == 'No':
        return 'false'
    elif  str(value).strip() == 'NO':
        return 'false'
    elif  str(value).strip() == 'no':
        return 'false'
    elif  str(value).strip() != '' and not pd.isnull(value):
        return value
    else:
        return None

def clean_string(value: str) -> str:
    if not pd.isnull(value) and isinstance(value, str) and value:
        rs = value.replace("\n", " ")
        return str(rs).strip()
    else:
        return value

def fill_dataframe(df: pd.DataFrame, name: str) -> pd.DataFrame:
    out = init_dataframe(name)
    items = get_dict(name).items()
    for key, value in items:
        out[key] = df[value].apply(lambda row: convert_if_boolean(row))
        out[key] = out[key].apply(lambda row: clean_string(row))

    out['localidadId'] = get_foreign_key_locations(df)
    lat_long = get_lat_long(df)
    out['latitud'] = lat_long['latitud']
    out['longitud'] = lat_long['longitud']
    out['tamano'] = out['tamano'].fillna(1).astype('int32')
    out['demanda'] = out['demanda'].fillna(1).astype('int32')
    out['limpieza'] = out['limpieza'].fillna(1).astype('int32')
    
    return out    

def link_imagen(df: pd.DataFrame, name: str) -> pd.DataFrame:
    print('Linking images for table ', name, '...')
    out = pd.DataFrame(columns=imagen_header)
    indexId =  imagen_header.index(name + 'Id')
    i = 0
    for index, row in df.iterrows():
        imagen = row['IMAGEN'] if not pd.isnull(row['IMAGEN']) else ''
        if imagen != '':
            names = [ f for f in os.listdir(os.path.dirname(__file__) + '/imagenes/' + name) 
                if os.path.isfile(os.path.join(os.path.dirname(__file__) + '/imagenes/' + name, f)) and f.startswith(imagen) ]
            for n in names:
                if imagen in n:
                    new_row = [n, None, None, None, None, None]
                    new_row[indexId] = index + 1
                    out.loc[i] = new_row
                    i += 1
    return out


def prepare_imagen(name, migrations_path):
    print("Preparing imagen table...")
    dirname = os.path.dirname(__file__) + '/excel'
    files = [ f for f in os.listdir(dirname) if os.path.isfile(os.path.join(dirname, f)) and f.endswith('.xlsx') ]
    out = pd.DataFrame(columns= imagen_header)
    for file in files:
        df = pd.read_excel(os.path.join(dirname, file))
        foreign_table = file[:-5]
        iteration = link_imagen(df, foreign_table)
        out = pd.concat([out, iteration])

    out.to_csv(os.path.join(migrations_path, name + '.csv'), index=False)

def main(name, path, migrations_path, sheet_name):

    df = pd.read_excel(path, sheet_name=sheet_name)
    out = fill_dataframe(df, name)
    out.to_csv(os.path.join(migrations_path, name + '.csv'), index=False)
    

if __name__ == '__main__':

    if len(sys.argv) == 3 and sys.argv[1] == 'imagen':
        table_name = sys.argv[1]
        migrations_path = sys.argv[2]
        # download_zips()
        decompress_imagen()
        prepare_imagen(table_name, migrations_path)
        move_imagenes_to_storage()

    elif len(sys.argv) >= 4:
        name = sys.argv[1]
        path = sys.argv[2]
        migrations_path = sys.argv[3]
        sheet_name = 'ZONAS'
        if(len(sys.argv) > 4):
            sheet_name = sys.argv[4]
            
        main(name, path, migrations_path, sheet_name)
    else:
        print('Missing arguments')
        print('Usage: python3 prepare.py <table_name> <path_to_excel_file> <path_to_migrations_folder> <sheet_name>')
        print('Usage: python3 prepare.py imagen <path_to_migrations_folder> ')

