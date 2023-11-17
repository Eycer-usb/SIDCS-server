echo Start building...

sudo apt -y update
sudo apt -y upgrade

sudo apt -y install python3
sudo apt -y install python3-pip

npm install
npx @nestjs/cli build
pip install -r scripts/requirements.txt
python3 scripts/migrations/load_images.py
./seed.sh