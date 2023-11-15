import os
from prepare import download_zips

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