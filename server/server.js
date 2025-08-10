const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

//Route Files
const masters = require("./routes/masters");
const employees = require("./routes/employees");

//Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

//Middleware
// app.use(cors());
app.use(
  cors({
    origin: "https://render-frontend-6im3.onrender.com",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

//Mount routers
app.use("/api/masters", masters);
app.use("/api/employees", employees);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
