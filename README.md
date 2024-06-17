# Todolist server

## How to run

### First start

Start by choosing a secret for your JWTs, to do this, remove "-example" from the `.env-example` file and replace the value by your secret.

To run the project, you need to run this command to install packages :

```bash
npm install
```

Once this is done, you can run this command to init the SQLite database and populate it :

```bash
npm run start:initdb-populate
```

If you don't want to populate the database, you can just run this command to init the database :

```bash
npm run start:init-db
```

### Next starts

Once the database is initialized, you can run this command on next starts to launch the server :

```bash
npm run start
```
