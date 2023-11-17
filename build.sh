echo Start building...

apt -y update
apt -y upgrade

apt -y install python3
apt -y install python3-pip

npm install
npx @nestjs/cli build
# pip install -r scripts/requirements.txt
python3 scripts/migrations/load_images.py
./seed.sh