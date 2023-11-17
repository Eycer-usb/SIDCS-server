import os

def download_zips():
    print("Downloading zips")
    zips = {
        "laboratorioClinico": "https://drive.google.com/uc?export=download&id=1WK-bFRE4Jb8Nmfzepn6UwxzNFVVA7v9r&confirm=t&uuid=cca6516b-cd24-41af-9229-2eef46314a04",
        "centroOftalmologico": "",
        "centroOdontologico": "",
        "clinicaPrivada": "",
        "grupoMedico": ""
    }
    for f in zips:
        link = zips[f]
        if link != '':
            dirname = os.path.dirname(__file__)
            path_zip =  dirname + '/zip'
            os.system('mkdir -p ' + path_zip)
            os.system('rm -rf ' + path_zip + '/*')            
            command = "wget '" + link + "' -O " + path_zip + '/' + f + '.zip'
            os.system(command)

def move_imagenes_to_storage():
    print('Moving images to storage...')
    dirname = os.path.dirname(__file__)
    path_zip =  dirname + '/zip'
    files = [ f for f in os.listdir(path_zip) if os.path.isfile(os.path.join(path_zip, f)) and f.endswith('.zip') ]
    for file in files:
        name = file[:-4]
        os.system('cp ' + dirname + '/imagenes/' + name + '/* ' + dirname + '/../../storage/centrosDeSalud' + ' > /dev/null')

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
    

if __name__ == '__main__':
    download_zips()
    decompress_imagen()
    move_imagenes_to_storage()