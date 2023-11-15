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

def get_locations_dictionary() -> dict:
    dirname = os.path.dirname(__file__)
    df = pd.read_csv(os.path.join(dirname, locations_csv))
    dic = { key: value for (key, value) in zip(df['descripcion'], df['id']) }
    return dic

def get_foreign_key_locations(df: pd.DataFrame) -> pd.DataFrame:
    locations_dic = get_locations_dictionary()
    return df['ZONA.1'].apply(lambda row: locations_dic[row])

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
        lat, lon = convert_route_to_lat_long(row['LINK GPS. UBICACIÓN EXACTA'])
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
    else:
        raise Exception('Invalid table name')
    return pd.DataFrame(columns=columns)

def get_dict(name: str) -> dict:
    if name == 'laboratorioClinico':
        return laboratorio_clinico_dict
    else:
        raise Exception('Invalid table name')

def fill_dataframe(df: pd.DataFrame, name: str) -> pd.DataFrame:
    out = init_dataframe(name)
    items = get_dict(name).items()
    for key, value in items:
        out[key] = df[value]
    out['localidadId'] = get_foreign_key_locations(df)
    lat_long = get_lat_long(df)
    out['latitud'] = lat_long['latitud']
    out['longitud'] = lat_long['longitud']
    
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
        
def decompress_imagen():
    print('Decompressing images...')
    dirname = os.path.dirname(__file__)
    path_zip =  dirname + '/zip'
    files = [ f for f in os.listdir(path_zip) if os.path.isfile(os.path.join(path_zip, f)) and f.endswith('.zip') ]
    for file in files:
        name = file[:-4]
        os.system('rm -rf ' + dirname + '/imagenes/' + name)
        os.system('mkdir -p ' + dirname + '/imagenes/' + name)
        os.system('unzip -j ' + path_zip + '/' + file + ' -d ' + dirname + '/imagenes/' + name + ' > /dev/null')
    

def move_imagenes_to_storage():
    print('Moving images to storage...')
    dirname = os.path.dirname(__file__)
    path_zip =  dirname + '/zip'
    files = [ f for f in os.listdir(path_zip) if os.path.isfile(os.path.join(path_zip, f)) and f.endswith('.zip') ]
    for file in files:
        name = file[:-4]
        os.system('cp ' + dirname + '/imagenes/' + name + '/* ' + dirname + '/../../storage/centrosDeSalud' + ' > /dev/null')
    
def main(name, path, migrations_path, sheet_name):

    df = pd.read_excel(path, sheet_name=sheet_name)
    out = fill_dataframe(df, name)
    out.to_csv(os.path.join(migrations_path, name + '.csv'), index=False)
    

if __name__ == '__main__':

    if len(sys.argv) == 3 and sys.argv[1] == 'imagen':
        table_name = sys.argv[1]
        migrations_path = sys.argv[2]
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
        print('Usage: python prepare.py <table_name> <path_to_csv_file> <path_to_migrations_folder> <sheet_name>')

