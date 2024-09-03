**##Features**

```
- Docs Swagger
- Upload File with Multer
- MiddleWare Auth with JsonWebToken(JWT)
- SendMail using NodeMailer
```

**##How to use**

clone with `https` / `ssh` / `github cli`\_

```sh
git clone https://github.com/NRestFzn/express-sequelize.git
```

_After you clone this repository make sure you make .env file, then copy everything from .env.example file and paste it to .env file._

**##Install required packages**

```sh
npm install

or

yarn
```

**##Run the app using this script**

```sh
npm run start

or

yarn start
```

**##Necessary**

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

- If you're using template engines such as handlebars or ejs with tailwind css, use this script for every tailwind css update

```sh
npm run tailwind:build
```
