echo Start building...

npm install
npx @nestjs/cli build

python3 scripts/migrations/load_images.py
./seed.sh

echo Finish building...