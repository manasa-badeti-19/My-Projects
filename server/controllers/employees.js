//@desc         Post/Save Employee data
//@route        POST /api/employees
const pool = require("../db");

//Mapping frontend keys -> DB column names
const fieldMap = {
  firstName: "first_name",
  lastName: "last_name",
  dob: "dob",
  gender: "gender_id",
  email: "email",
  mobNo: "mobile_number",
  department: "department_id",
  designation: "designation_id",
  employmentType: "employment_id",
  joiningDate: "joining_date",
  workLocation: "work_location_id",
  shift: "shift_id",
  manager: "manager_id",
  role: "role_id",
  addrs1: "address_line1",
  addrs2: "address_line2",
  country: "country_id",
  state: "state_id",
  city: "city_id",
  pincode: "pincode",
  pan: "pan",
  aadhaar: "aadhaar",
  bank: "bank_id",
  accNo: "account_no",
  ifscCode: "ifsc",
};

exports.saveEmployee = async (req, res, next) => {
  const {
    firstName,
    lastName,
    dob,
    gender,
    email,
    mobNo,
    department,
    designation,
    employmentType,
    joiningDate,
    workLocation,
    shift,
    role,
    manager,
    addrs1,
    addrs2,
    country,
    state,
    city,
    pincode,
    pan,
    aadhaar,
    bank,
    accNo,
    ifscCode,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO employees
        (
        first_name,
        last_name,
        dob,
        gender_id,
        email,
        mobile_number,
        department_id,
        designation_id,
        employment_id,
        joining_date,
        work_location_id,
        shift_id,
        role_id,
        manager_id,
        address_line1,
        address_line2,
         country_id,
        
        state_id,
       city_id,
        pincode,
       
        pan,
        ifsc,
         aadhaar,
        bank_id,
        account_no
        )
        VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)
        RETURNING employee_id`,

      [
        firstName,
        lastName,
        dob,
        gender,
        email,
        mobNo,
        department,
        designation,
        employmentType,
        joiningDate,
        workLocation,
        shift,
        role,
        manager,
        addrs1,
        addrs2,
        country,
        state,
        city,
        pincode,
        pan,
        ifscCode,
        aadhaar,
        bank,
        accNo,
      ]
    );
    res.status(201).json({
      sucess: true,
      message: "Employee created successfully",
      data: { employeeId: result.rows[0].employee_id },
    });
  } catch (err) {
    console.log("err code", err.code);
    if (err.code === "23505" || err.code === "23514") {
      //Unique violation
      console.log("err", err.message, err.constraint);
      if (err.constraint === "uq_employee_aadhaar") {
        console.log("err", err.message);
        return res.status(400).json({
          status: "FAILURE",
          message: "Aadhaar already exists",
          errorCode: "EMP_DUPLICATE",
        });
      } else if (err.constraint === "uq_ifsc_account") {
        console.log("err", err.message);
        return res.status(400).json({
          status: "FAILURE",
          message:
            "Duplicate Combination of iFSC Code and Account No\n Employee with same Account Number and IFSC Code exists",
          errorCode: "EMP_DUPLICATE",
        });
      } else if (err.constraint === "employees_mobile_number_key") {
        return res.status(400).json({
          status: "FAILURE",
          message: "Employee with the given mobile number already exists",
          errorCode: "EMP_DUPLICATE",
        });
      } else if (err.constraint === "employees_pan_key") {
        return res.status(400).json({
          status: "FAILURE",
          message: "Employee with the given PAN already exists",
          errorCode: "EMP_DUPLICATE",
        });
      } else {
        console.log("err", err.message);
        return res.status(400).json({
          status: "FAILURE",
          message: `Employee already exists. ${err.constraint}`,
          errorCode: "EMP_DUPLICATE",
        });
      }
    }
    return res
      .status(500)
      .json({ status: "FAILURE", message: "Internal Server Error" });
  }
};

//@desc         Get all Employees data
//@route        GET /api/employees
exports.getAllEmployees = async (req, res, next) => {
  try {
    //if u *, somecolumnname from oneTable and Join to other table it fetches all the columns from both the tables. so 'somecolumnname' will be duplicated(fetched twice)

    //e.* means all columns from employees table only
    const result = await pool.query(`
        SELECT e.*,d.name AS departmentName, dg.name AS designationName,
        wl.name AS workLocationName
        FROM employees e 
         LEFT JOIN departments d ON e.department_id = d.id
          LEFT JOIN designations dg ON e.designation_id = dg.id
           LEFT JOIN locations wl ON e.work_location_id = wl.id
           ORDER BY e.employee_id DESC
        `);

    res.status(200).json({
      status: "SUCCESS",
      message: "Fetched employee records successfully",
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

//@desc         Get individual Employee data
//@route        GET /api/employees/:id
exports.getEmployee = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT e.*,d.name AS departmentName, dg.name AS designationName,
        wl.name AS workLocationName
        FROM employees e
         LEFT JOIN departments d ON e.department_id = d.id
          LEFT JOIN designations dg ON e.designation_id = dg.id
           LEFT JOIN locations wl ON e.work_location_id = wl.id
            WHERE employee_id=$1`,
      [req.params.id]
    );

    res.status(200).json({
      status: "SUCCESS",
      message: "Fetched employee records successfully",
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

//@desc         Edit Employee data
//@route        PUT /api/employees/:id
exports.editEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fields = req.body; //we gonna pass only changed fields from frontend
    //eg:{name:"Manasa",department:"IT"}

    //Filter only column names of db matching with frontend keys
    const dbMappedFields = Object.keys(fields)
      .filter((key) => fieldMap[key]) //only keys which matches with db col name
      .reduce((obj, key) => {
        obj[fieldMap[key]] = fields[key]; //Map to db col name
        return obj;
      }, {});

    //if db col name is not found with the frontend key
    if (Object.keys(dbMappedFields).length === 0) {
      return res.status(400).json({ error: "No db col name is matching" });
    }
    //Build SET clause dynamically
    //eg: UPDATE employess SET name = $1, department =$2 WHERE employee_id = $3

    const setClause = Object.keys(dbMappedFields) //["name","department"]
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", "); //"name = $1, "department = $1"

    const values = Object.values(dbMappedFields); //["Manasa","IT"] values of keys

    const query = ` 
  UPDATE employees
  SET ${setClause}
  WHERE employee_id = $${values.length + 1} 
  RETURNING *
  
  `;
    //eg: values.length +1 =3 -> $3

    const result = await pool.query(query, [...values, id]);
    res.status(200).json({
      sucess: true,
      message: `Employee data of id ${id} updated Successfully`,
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//@desc         Delete Employee data
//@route        DELETE /api/employees/:id
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  try {
    //First delete employee
    await pool.query(
      `DELETE FROM employees WHERE employee_id = $1 RETURNING *`,
      [id]
    );
    //then get remaining employees
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY employee_id DESC"
    );

    if (result.rowCount === 0) {
      res.status(404).json({ success: false, message: "Employee Not Found" });
    }
    res.status(200).json({
      sucess: true,
      message: `Employee data of id ${id} deleted successfully`,
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
