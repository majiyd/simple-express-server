In this simple project, i'll be experimenting with and building my first REST API.
  
I'll be making use of
1. [Node](https://nodejs.org/en/)
2. [Express](https://expressjs.com/)
3. [Sequelize](https://sequelize.org/)
4. [PostgreSQL](https://www.postgresql.org/)

To run locally on your system clone the repo<br>
```
git clone https://github.com/majiyd/simple-express-server.git
```
then running
```
yarn
```
Download and install PostgreSQL [here](https://www.postgresql.org/download/) if you don't have it installed already.

Update the content in `/config/config.js` with the correct username and password for your install.

Now run
```
sequelize-cli db:create && sequelize-cli db:migrate && sequelize-cli db:seed:all
```
This would create the database, the required tables, columns and update them with some default data.

Finally run
```
npm start
```

Test the api using Postman at `http://localhost:${PORT}`.<br>