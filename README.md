##Cara Pemakaian
##How to use

ID - clone dengan `https` / `ssh` / `github cli`

EN - clone with `https` / `ssh` / `github cli`

```sh
git clone https://github.com/justRizu/daily-activity.git
```

ID - Jika sudah di clone, buat file .env lalu copy semua yang ada di file
.env.example lalu paste di file .env nya.

EN - After you clone this repository make sure you make .env file,
then copy everything from .env.example file and paste it to .env file.

##Install required dependencies

ID - Sebelum melakukan menjalankan aplikasi, pastikan jalankan script ini
di terminal terlebih dahulu

EN - Before using the app, run this script first on your terminal

```sh
npm install

or

yarn
```

##Jalankan aplikasi nya menggunakan script ini
##Run the app using this script

```sh
npm run start

or

yarn start
```

##Penting
##Necessary

```sh
- App Swagger Docs :
http://localhost:8000/v1/api-docs

- buat database | create database :
npm run db:create

- migrasi file migrations ke database | migrating migrations file to database :
npm run db:migrate

- hapus database | drop database :
npm run db:drop

- migrasi ulang ke database jika ada perubahan pada file migration | re-migrate if there's a change on the migration file :
npm run db:migrate:refresh

- melakuan 4 perintah diatas sekaligus | run all the 4 scripts above :
npm run db:reset

- melakukan build pada css yang berbentuk tailwind / build for tailwind css :
npm run tailwind:build
```

```sh
If you have any suggestion or wanna ask something, don't hesitate to ask.
Contact me : nashirresta7@gmail.com

thank you~~ :)
```
