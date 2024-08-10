**##Cara Pemakaian**
**_##How to use_**

ID - clone dengan `https` / `ssh` / `github cli`

_EN - clone with `https` / `ssh` / `github cli`_

```sh
git clone https://github.com/justRizu/daily-activity.git
```

ID - Jika sudah di clone, buat file .env lalu copy semua yang ada di file .env.example lalu paste di file .env nya.

_EN - After you clone this repository make sure you make .env file, then copy everything from .env.example file and paste it to .env file._

**Install package package penting**
**_##Install required packages_**

ID - Sebelum melakukan menjalankan aplikasi, pastikan jalankan script ini
di terminal terlebih dahulu

_EN - Before using the app, run this script first on your terminal_

```sh
npm install

or

yarn
```

**##Jalankan aplikasi nya menggunakan script ini**
**_##Run the app using this script_**

```sh
npm run start

or

yarn start
```

**##Penting**
**_##Necessary_**

- Swagger Docs :

```sh
http://localhost:8000/v1/api-docs
```

- Create Database

```sh
npm run db:create
```

- Migrate migrations file

```sh
npm run db:migrate
```

- Drop Database

```sh
npm run db:drop
```

- Re-migrate all migration file

```sh
npm run db:migrate:refresh
```

- Drop, Create, Migrate, Seed at the same time

```sh
npm run db:reset
```

- If you using handlebars with tailwind css, use this script for every tailwind css update

```sh
npm run tailwind:build
```

**##Gak penting**
**_##Necessary_**

```sh
If you have any suggestion or wanna ask something, don't hesitate to ask.
Contact me : nashirresta7@gmail.com

thank you~~ :)
```
