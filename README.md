##Cara Pemakaian
##How to use it 

ID - clone dengan `https` / `ssh` / `github cli`

EN - clone with `https` / `ssh` / `github cli`

```sh
git clone https://github.com/justRizu/daily-activity.git
```

ID - Kalau sudah di clone buat file dengan nama .env,
lalu copy semua yang ada di .env.example, paste di .env lalu isi sesuai kebutuhan.

EN - After you clone this repository make sure you make .env file,
then copy everything from .env.example file, paste it to .env file.file

##Install

ID - buka terminal dan jalankan script berikut

EN - open terminal and run this script 

```sh
npm install

or

yarn
```

##Run app

```sh
npm run start

or

yarn start
```

##Necessary

```sh
http://localhost:8000/v1/api-docs <- swagger docs 
npm run db:create <- buat database / make database
npm run db:migrate <- migrasi ke database / migrating to database
npm run db:drop <- hapus database / drop database
npm run db:migrate:refresh <- migrasi ulang ke database jika ada perubahan / re-migrate if there's a change
npm run db:reset <- melakuan 4 perintah diatas sekaligus / run all 4 scripts above 
npm run tailwind:build <- melakukan build pada css yang berbentuk tailwind / build for tailwind css
```

##Work in progress

```sh
Crud for activity and more features
```

##Note

```sh
ID - masih dalam pengembangan
EN - Still got an update till now
```
