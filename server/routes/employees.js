const express = require("express");
const pool = require("../db");
const {
  saveEmployee,
  getAllEmployees,
  getEmployee,
  editEmployee,
  deleteEmployee,
} = require("../controllers/employees");
const router = express.Router();

router.route("/").get(getAllEmployees).post(saveEmployee);

router.route("/:id").get(getEmployee).put(editEmployee).delete(deleteEmployee);

module.exports = router;
