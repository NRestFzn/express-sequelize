##Cara Pemakaian

clone dengan `https` / `ssh` / `github cli`

```sh
git clone https://github.com/justRizu/daily-activity.git
```

Kalau sudah di clone buat file dengan nama .env,
lalu copy semua yang ada di .env.example, paste di .env lalu isi sesuai kebutuhan.

##Install

```sh
npm install

atau

yarn
```

##Running app

```sh
npm run start

atau

yarn start
```

##Necessary

```sh
http://localhost:8000/v1/api-docs <- dokumentasi swagger
npm run db:create <- buat database
npm run db:migrate <- migrasi model ke database
npm run db:drop <- hapus database
npm run db:migrate:refresh <- migrasi ulang model ke database jika ada perubahan
npm run db:reset <- melakuan 4 perintah diatas sekaligus
npm run tailwind:build <- melakukan build pada css yang berbentuk tailwind
```

##Work in progress

```sh
Crud for activity and more features
```

##Note

```sh
Masih dalam pengembangan
```
