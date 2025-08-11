**[Employee Onboarding System](https://render-frontend-6im3.onrender.com/)** 

__A full-stack Employee Onboarding System that captures personal, job-related, address, and bank details of a new employee.
View all employees, edit and delete any employee.__

__Deployed to RENDER__
__HERE ARE THE STEPS TO DEPLOY ON RENDER__

How to deploy frontend and backend to Render

1) Push ur code to git
2) Create a account in render
3) connect to git repo (where u have the code to deploy) in render
4) In ur local code
client/ → React frontend

server/ → Node + Express backend (talks to PostgreSQL)
1) In your server/ folder:
   Add a start script in server/package.json:

   "scripts": {
  "start": "node server.js",   //nodemon in prod in render it won't accept
  "dev": "nodemon server.js"  //nodemon only in dev
  }

2) Allow CORS for production:<br>
    import cors from "cors";

     app.use(cors({
  origin: "https://your-frontend-url.onrender.com", // update later
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

3)  Use environment variables for DB credentials and port in node code



 Deploy Backend to Render
---------------------------------------
Push your whole project to GitHub.

Go to Render → New Web Service → Connect GitHub → choose the server folder.

Build settings:

Root Directory: server

Environment: Node

Build Command: npm install

Start Command: npm start

Add Environment Variables (from .env):
Deploy → You’ll get something like:

https://your-backend.onrender.com


Create your PostgreSQL database on Render
-------------------------------------------------
1. Log in to Render.

Click New → PostgreSQL.

Give it a name (e.g., employee_onboarding_db).

Select your region and click Create Database.

2. Find the Database URL
Once Render creates the database:

Go to your database service page.

Look for "External Database URL" or "Internal Database URL".

It will look like this:

postgres://username:password@hostname:5432/databasename

3. Use it in your Node/Express backend
In your backend code, you’ll store it in .env:

DATABASE_URL=postgres://username:password@hostname:5432/databasename

And in your Node code and push ur code to git:


import pg from "pg";<br>
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // required for Render
});

Set the DATABASE_URL in Render
----------------------------------------------
Go to your Render backend service settings and set these below & redeploy.

Scroll to Environment → Environment Variables.
DATABASE_URL = postgres://username:password@host:port/dbname
You’ll get this full URL from Render → Databases → Connect.


Update the deployed render backend api url in react code in env file and use that in ur files
--------------------------------------------------------------------------

REACT_APP_API_URL=https://your-backend.onrender.com


Deploy Frontend to Render
---------------------------------------------------------
Create a new Static Site in Render.

Root Directory: client

Build Command: npm install && npm run build

Publish Directory: build

Add an env var for API:

REACT_APP_API_URL=https://your-backend.onrender.com

Deploy → You’ll get:

https://your-frontend.onrender.com

 Update Backend CORS in node code. Push to git & redeploy backend on render.
------------------------------------------------
After frontend deploy, update backend:<br>
server.js<br>
app.use(cors({
  origin: "https://your-frontend.onrender.com",
  credentials: true
}));

To migrate local Db data to render db
--------------------------------------------------
In command prompt afte starting db server
1) Dump your DB:

    pg_dump -U your_user -d your_dbname > dump.sql<br>
2)  Upload to Render DB:

    psql $RENDER_EXTERNAL_DATABASE_URL < dump.sql


