
# NTask-API

Building APIs with Node.js Examples

## Chapter 1 :: Introduction to Node.js

- Single-Thread Arquitecture
  - Asynchronous programming: Non-Blocking IO
  - Event Loop: Event-Oriented Paradigm: Responsible for noticing and triggering events
  - Advantages
    - JavaScript Everywhere
    - Active Community
    - Active Open Source Modules (+300k projects in NPM)
    - Ready for Real Time ([SockJS](http://sockjs.org)|[Socket.IO](https://socket.io/))
    - Big Players (LinkedIn, Walmart, Groupon, MS, Netflix, Uber, PayPal…)

## Chapter 2 :: Setting up the Environment

- Install node
  - Download from [Node.js](https://nodejs.org)
    - Linux
    - MacOSX
    - Windows
  - Installation via NVM

    `curl https://raw.githubusercontent.com/creationix/nvm/v0.3.2.1/install.sh | bash`
    ```bash
      nvm  ls
      nvm ls-remote
      nvm install
      nvm uninstall
      nvm use
      nvm alias default
    ```

## Chapter 3 :: Managing Modules with NPM

- NPM

  ```bash
    npm init
    npm install [-g]
    npm remove [-g]
    npm update [-g]
    npm list [-g]
    npm -v
    npm adduser
    npm whoami
    npm publish
  ```

- Package.json: module attributes
  - 3 levels of versioning
    - Major
    - Minor
    - Patch
- Task Automation: `npm run <command>`

## Chapter 4 :: Building an API

- Express Framework
  - Views
  - Controllers
  - Routers
  - Optional:
    - ORMs
    - ODMs
- Characteristics
  - Robust routing
  - Easy integration to Template engines
  - Minimalist code
  - Easy Middleware Concept implementation
    - Huge amount of readily available middleware
  - Content negotiation
  - Adopts **REST API** standards and *best practices*
- ntask-api

  ```bash
    npm init
    npm install —save-dev @babel/core @babel/cli @bable/preset-env
    package.json :: ‘start’: ‘node index.js’
    npm install —save consign
    npm start
  ```

## Chapter 5 :: Working with SQL Databases

- SQLite3
- Sequelize
  - `/libs/config.js`: line: 11: Params.operatorsAliases: false // Get rid of Warnings due to use of newest Sequelize version
  - `db.js`: Load DB configuration as Singleton connection to ensure connections is ONLY instantiate once
  - `app.js`: Alter the loading sequence to now include the DB connection to SQLIte3
  - **Models**: Users 1-N Tasks models/tasks.js and models/users.js
  - `db.js`: Modify to read ALL model definitions under `models/*.js`
  - Changes in newest Sequelize version impact `db.js`: line 28: `db.models[key].options.classMethods.associate(db.models);`
  - Now EMPTY tasks results since we have not added (dummy) data

## Chapter 6 :: CRUDify API Resources

- Modify the `routes/tasks.js` to handle **get**, **post**, **put**, and **delete**
  - Refactor the `routes/tasks.js` moving the `app.all` function to `libs/middlewares.js`
- Create the `routes/users.js` to handle **get**, **delete**, and **post**
- Test the task endpoints with **Postman** application
- Refactor replacing *double quotes* with *single quotes* on all applicable files

## Chapter 7 :: Authenticating Users

- Install Passport framework for user authentication: `npm install passport passport-jwt jwt-simple --save`
- Create the `auth.js` middleware and add it to the boot sequence in `index.js`
  - Passport library change amends `auth.js` to change the following line to: `jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')`
- Authentication is then initialize in `middlewares.js`
- Install the encryption library: `npm install bcrypt --save`
- Update `models/users.js` to encrypt the users password before storing it `beforeCreate`
  - Also, the `isPassword` will allow validating the supplied user password with the password already stored
- Create the `/token` endpoint in `routes/token.js` with the logic for suplying the JWT to be used
- Update `routes/tasks.js` with the authentication verification adding the `.all(app.auth.authenticate())`
- Refactor `routes/users.js` to use `.all(app.auth.authenticate())` and verify against `req.user.id`

## Chapter 8 :: Testing the Application: Part 1

- Move `libs/config.js` to `libs/config.development.js` then duplicate it as `libs/config.test.js`
  - Add to the `libs/config.test.js` the `logging: false` parameter
- Create the `libs/config.js` file for use of the `process.env.NODE_ENV` variable
- Install new development packages: `npm install babel-register mocha chai supertest --save-dev`
- Update `package.json` with a new run scritp: `"test": "NODE_ENV=test mocha test/**/*.js`
  - Update `index.js` with `module.exports = app;` and `consign({ verbose: false })`
  - Update `libs/boot.js` to use the `process.env.NODE_ENV` variable
  - Create `test/helpers.js` and `test/mocha.opts`
  - Create the first test `test/routes/index.js`
  - Execute the first test: `npm test`
- Fixes due to used of latest `Sequelize` ORM
  - Now the `Tasks` model `associate` attribute is redefined as: `Tasks.associate`
  - The same goes for `Users` model attributess: `Users.associate` and `Users.isPassowrd`

## Chapter 9 :: Testing the Application: Part 2

- Create `test/routes/tasks.js` and `test/routes/users.js`
  - Create test cases for GET, POST, PUT, and DELETE
- Fixes due to latest `Sequelize` ORM
  - Change **deprecated** `findById` to latest `findByPk` in `routes/tasks.js` and `routes/users.js`
    - Fix `expected` clauses to use `res.text` instead of `res.body`
  - Add `passport.serializeUser` and `passport.deserializeUser`
  - Fix `find*` methods with `where` clause, changing `user_id` to `UserId`

## Chapter 10 :: Documenting the API

- Install `npm install apidoc --save-dev`
- Update `package.json` to add the **apidoc** command
- Create `public/` folder and update `middleware.js`
- Add APIdoc on API implementations

## Chapter 11 :: Preparing the Production Environment

- Install CORS middleware `npm install cors --save`
  - Initialize CORS updating `libs/middleware.js`
- Install `Winston` and `Morgan` for log processing
  - `npm install winston morgan --save`
  - Update `libs/config.development.js` and `libs/middlewares.js`
    - Change `new winston.Logger` to `new winston.createLogger`
- Create Clusters middleware `clusters.js`
  - Update `package.json` with cluster script command
- Install GZIP middleware `npm install compression --save`
- Update to HTTPS generating the self signed certificate
  - Download the `.key` and `.cert`, rename and put the files in the root directory
  - Update `libs/boot.js` to use the self signed credentials
- Install HELMET `npm install helmet --save`
