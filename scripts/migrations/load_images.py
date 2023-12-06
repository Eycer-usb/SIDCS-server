import os

def download_zips():
    print("Downloading zips")
    zips = {
        "laboratorioClinico": "https://drive.google.com/uc?export=download&id=1r2bzeogZglwZM1uVUtzu8HegU2MfHnqn&confirm=t&uuid=2f8ddbf0-39f0-4a10-933c-5c5ebb82f162&at=AB6BwCAR9Sstt2p5iuU1hUSZxMrI:1701810849671",
        "centroOftalmologico": "https://drive.google.com/uc?export=download&id=1Y5tdbABV4PzxlSmO62rfUWYLW_4iL-SG&confirm=t&uuid=29962443-e0fd-4dff-9529-12d51621fb8e&at=AB6BwCAttpB21S1EnTvpCPA9qoQK:1701810868571",
        "centroOdontologico": "https://drive.google.com/uc?export=download&id=1Auu9IBxcAoHoAG3XaQKOVLkyCZ00QeCc&confirm=t&uuid=2715abb7-65ae-4ee7-b639-8ebfafe8f80a&at=AB6BwCAlwo1luV7s8ZkN0KmAEZV2:1701810908323",
        "clinicaPrivada": "https://drive.google.com/uc?export=download&id=1EVdOMQCylPCg5PPuQMu8C4K4Qh5nREp3&confirm=t&uuid=aa7d7aba-b59c-43d9-8afc-d433714541dc&at=AB6BwCDv3eB6utr9PcXPU7rD9SvH:1701810923633",
        # "grupoMedico": ""
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