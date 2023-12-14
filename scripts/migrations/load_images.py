import os

def download_zips():
    print("Downloading zips")
    zips = {
        "laboratorioClinico": "https://drive.google.com/uc?export=download&id=185zOPpWURwgkKOFrkkolDAhEqrVFBw8-&confirm=t&uuid=a0a5ab4b-dd51-4e09-b140-d08060a0837f&at=AB6BwCArs7K7X72f89AdyZmiVF4F:1702568646711",
        "centroOftalmologico": "https://drive.google.com/uc?export=download&id=18PB86kwuJ2SAAu3oNDuOoILODUgZi9QV&confirm=t&uuid=28fff727-657f-4883-898e-884ce612247c&at=AB6BwCAiy28cmgFBwNY9M1jwa-Lu:1702568941249",
        "centroOdontologico": "https://drive.google.com/uc?export=download&id=1TZq8PMIHCZJkyXnkFFWqEXmNuCsGtS0T&confirm=t&uuid=9d138d1d-a809-42d9-b4a0-e72ae2481126&at=AB6BwCB4Z9uUO3ajPzXWJVMtWaYu:1702568977892",
        "clinicaPrivada": "https://drive.google.com/uc?export=download&id=1ThOeadUXlyrtuqYoPedAa_fUqR6DMVj4&confirm=t&uuid=05e73fbd-92a6-43e5-96cb-e7f099de2f95&at=AB6BwCBCIqo_R7VSND5gpdYRZcu-:1702568907333",
        "grupoMedico": "https://drive.google.com/uc?export=download&id=18Z-nYvndVpmCyTSOuLIImT8n26M6wv2c&confirm=t&uuid=2e9c4c36-f1ad-46d7-ae00-fccbb21f9b10&at=AB6BwCCpJJNWjkiGl37g622w4tHm:1702568694509"
    }
    dirname = os.path.dirname(__file__)
    path_zip =  dirname + '/zip'
    os.system('mkdir -p ' + path_zip)
    os.system('rm -rf ' + path_zip + '/*')
    for f in zips:
        link = zips[f]
        if link != '':            
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