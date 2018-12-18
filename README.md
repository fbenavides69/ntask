# ntask
Building APIs with Node.js Examples

## Chapter 1 :: Introduction to Node.js
- Single-Thread Arquitecture
  + Asynchronous programming: Non-Blocking IO
  + Event Loop: Event-Oriented Paradigm: Responsible for noticing and triggering events
  + Advantages
    o JavaScript Everywhere
    o Active Community
    o Active Open Source Modules (+300k projects in NPM)
    o Ready for Real Time (SockJS|Socket.IO)
    o Big Players (LinkedIn, Walmart, Groupon, MS, Netflix, Uber, PayPal…)

## Chapter 2 :: Setting up the Environment
- Install node
  + Download from https://nodejs.org
    o Linux
    o MacOSX
    o Windows
  + Installation via NVM
    `curl https://raw.githubusercontent.com/creationix/nvm/v0.3.2.1/install.sh | bash`
    ```
      nvm  ls
      nvm ls-remote
      nvm install
      nvm uninstall
      nvm use
      nvm alias default
    ```

## Chapter 3 :: Managing Modules with NPM
- NPM
  ```
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
  + 3 levels of versioning
    o Major
    o Minor
    o Patch
- Task Automation: `npm run <command>`

## Chapter 4 :: Building an API
- Express Framework
  + Views
  + Controllers
  + Routers
  + Optional:
    o ORMs
    o ODMs
- Characteristics
  + Robust routing
  + Easy integration to Template engines
  + Minimalist code
  + Easy Middleware Concept implementation
    o Huge amount of readily available middleware
  + Content negotiation
  + Adopts **REST API** standards and *best practices*
- ntask-api
  ```
    npm init
    npm install —save-dev @babel/core @babel/cli @bable/preset-env
    package.json :: ‘start’: ‘node index.js’
    npm install —save consign
    npm start
  ```

## Chapter 5 :: Working with SQL Databases
- SQLite3
- Sequelize
  + `/libs/config.js`: line: 11: Params.operatorsAliases: false // Get rid of Warnings due to use of newest Sequelize version
  + db.js: Load DB configuration as Singleton connection to ensure connections is ONLY instantiate once
  + app.js: Alter the loading sequence to now include the DB connection to SQLIte3
  + Models: Users 1-N Tasks models/tasks.js and models/users.js
  + db.js: Modify to read ALL model definitions under `models/*.js`
  + Changes in newest Sequelize version impact `db.js`: line 28: `db.models[key].options.classMethods.associate(db.models);`
  + Now EMPTY tasks results since we have not added (dummy) data

## Chapter 6 :: CRUDify API Resources
- Modify the `routes/tasks.js` to handle **get**, **post**, **put**, and **delete**
  + Refactor the `routes/tasks.js` moving the `app.all` function to `libs/middlewares.js`
- Create the `routes/users.js` to handle **get**, **delete**, and **post**
- Test the task endpoints with **Postman** application
- Refactor replacing *double quotes* with *single quotes* on all applicable files
